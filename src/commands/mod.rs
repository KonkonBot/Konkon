use crate::Data;

pub mod user;

macro_rules! register_commands {
    ($($module:ident),*) => {
        {
            let mut cmds = Vec::new();
            $(
                cmds.extend($module::register());
            )*
            cmds
        }
    };
}

pub fn register_all_commands() -> Vec<poise::Command<Data, Box<dyn std::error::Error + Send + Sync>>> {
    register_commands!(
        user
    )
}
