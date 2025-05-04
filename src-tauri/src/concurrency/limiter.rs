use once_cell::sync::Lazy;
use tokio::sync::Semaphore;

pub static THUMBNAIL_SEMAPHORE: Lazy<Semaphore> = Lazy::new(|| Semaphore::new(5));
