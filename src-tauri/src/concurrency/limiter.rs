use tokio::sync::Semaphore;
use once_cell::sync::Lazy;

pub static THUMBNAIL_SEMAPHORE: Lazy<Semaphore> = Lazy::new(|| Semaphore::new(5));
