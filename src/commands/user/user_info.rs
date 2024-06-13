use crate::utils::image::get_avatar_color;
use crate::{Context, Error};
use poise::command;
use poise::serenity_prelude as serenity;

#[command(slash_command, prefix_command)]
pub async fn user_info(
    ctx: Context<'_>,
    #[description = "Selected user"] user: Option<serenity::User>,
) -> Result<(), Error> {
    let u = user.as_ref().unwrap_or_else(|| ctx.author());

    let _ = ctx.defer_or_broadcast().await;

    let avatar = u.face();

    let color = get_avatar_color(&avatar).await?;
    let rgb = color.0;

    let embed = serenity::CreateEmbed::new()
        .title("User Info")
        .fields(vec![
            ("Username", u.name.as_str(), true),
            ("ID", u.id.to_string().as_str(), true),
            ("Created at", u.created_at().to_string().as_str(), true),
        ])
        .thumbnail(&avatar)
        .author(serenity::CreateEmbedAuthor::new(format!("@{}", u.name.as_str())).icon_url(&avatar))
        .color(serenity::Color::from_rgb(rgb[0], rgb[1], rgb[2]));

    ctx.send(poise::CreateReply::default().embed(embed)).await?;

    Ok(())
}
