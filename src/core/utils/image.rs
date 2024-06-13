use image::{DynamicImage, GenericImageView, Rgba};
// use rayon::prelude::*;

pub async fn get_avatar_color(
    image_url: impl Into<String>,
) -> Result<Rgba<u8>, Box<dyn std::error::Error + Send + Sync>> {
    let response = reqwest::get(image_url.into()).await?.bytes().await?;
    let img = image::load_from_memory(&response)?;

    let dominant_color = get_dominant_color(&img)?;
    Ok(dominant_color)
}

pub fn get_dominant_color(
    img: &DynamicImage,
) -> Result<Rgba<u8>, Box<dyn std::error::Error + Send + Sync>> {
    let (width, height) = img.dimensions();
    let total_pixels = width * height;

    let (total_red, total_green, total_blue) = img
        .pixels()
        .par_bridge()
        .map(|(_, _, pixel)| (pixel[0] as u32, pixel[1] as u32, pixel[2] as u32))
        .reduce(
            || (0, 0, 0),
            |acc, val| (acc.0 + val.0, acc.1 + val.1, acc.2 + val.2),
        );

    let avg_red = (total_red / total_pixels) as u8;
    let avg_green = (total_green / total_pixels) as u8;
    let avg_blue = (total_blue / total_pixels) as u8;

    Ok(Rgba([avg_red, avg_green, avg_blue, 255]))
}
