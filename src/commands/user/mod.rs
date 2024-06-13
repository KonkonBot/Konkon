use crate::Data;

pub mod user_info;

pub fn register() -> Vec<poise::Command<Data, Box<(dyn std::error::Error + std::marker::Send + Sync + 'static)>>> {
    vec![
        user_info::user_info(),
    ]
}