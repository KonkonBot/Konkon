#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

use std::collections::HashMap;

#[napi(object)]
pub struct OptionConfig {
    pub name: String,
}

#[napi(object)]
pub struct ParserConfig {
    pub options: Vec<OptionConfig>,
    pub prefixes: Vec<String>,
    pub separators: Vec<String>,
    pub quotes: Vec<Vec<String>>,
}

fn extract_quotes(quotes: &[Vec<String>]) -> Vec<(&str, &str)> {
    quotes.iter()
        .filter_map(|pair| {
            if pair.len() == 2 {
                Some((pair[0].as_str(), pair[1].as_str()))
            } else {
                None
            }
        })
        .collect()
}

fn tokenize_content<'a>(content: &'a str, quotes: &[(&str, &str)]) -> Vec<&'a str> {
    let mut tokens = Vec::new();
    let mut in_quote: Option<(&str, &str)> = None;
    let mut start = 0;

    let chars = content.char_indices().peekable();
    for (i, _) in chars {
        if let Some((_, close)) = in_quote {
            if content[i..].starts_with(close) {
                tokens.push(&content[start..i]);
                start = i + close.len();
                in_quote = None;
            }
        } else if let Some((open, close)) = quotes.iter().find(|(open, _)| content[i..].starts_with(open)) {
            if start != i {
                tokens.push(&content[start..i]);
            }
            start = i + open.len();
            in_quote = Some((open, close));
        } else if content[i..].starts_with(' ') {
            if start != i {
                tokens.push(&content[start..i]);
            }
            start = i + 1;
        }
    }

    if start < content.len() {
        tokens.push(&content[start..]);
    }

    tokens
}

fn is_prefixed(token: &str, prefixes: &[&str]) -> bool {
    prefixes.iter().any(|&prefix| token.starts_with(prefix))
}

fn split_token<'a>(token: &'a str, separators: &[&str]) -> (&'a str, &'a str) {
    for sep in separators {
        if let Some(index) = token.find(sep) {
            return (&token[2..index], &token[index + sep.len()..]);
        }
    }
    (&token[2..], "true")
}

fn clean_value(value: &str) -> &str {
    value.trim_matches(|c| c == '"' || c == '“' || c == '”' || c == '`')
}

fn assign_value(map: &mut HashMap<String, String>, key: &str, value: &str) {
    let entry = map.entry(key.to_string()).or_default();
    if !entry.is_empty() {
        entry.push(' ');
    }
    entry.push_str(value);
}

fn parse_tokens<'a>(tokens: &[&'a str], options: &[&'a str], prefixes: &[&str], separators: &[&str]) -> HashMap<String, String> {
    let mut map = HashMap::new();
    let mut option_index = 0;

    for &token in tokens {
        if is_prefixed(token, prefixes) {
            let (key, value) = split_token(token, separators);
            assign_value(&mut map, key, clean_value(value));
        } else if option_index < options.len() {
            let option_name = options[option_index];
            assign_value(&mut map, option_name, token);
            option_index += 1;
        } else {
            assign_value(&mut map, "description", token);
        }
    }

    map
}

#[napi]
pub fn parser(content: String, config: ParserConfig) -> HashMap<String, String> {
    let quotes = extract_quotes(&config.quotes);
    let tokens = tokenize_content(&content, &quotes);
    let option_names: Vec<&str> = config.options.iter().map(|opt| opt.name.as_str()).collect();
    let prefixes: Vec<&str> = config.prefixes.iter().map(|p| p.as_str()).collect();
    let separators: Vec<&str> = config.separators.iter().map(|s| s.as_str()).collect();
    parse_tokens(&tokens, &option_names, &prefixes, &separators)
}
