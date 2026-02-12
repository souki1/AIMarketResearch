from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "CustomMarket API"
    debug: bool = False
    secret_key: str = "your-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24  # 24 hours
    database_url: str = "sqlite:///./custommarket.db"

    class Config:
        env_file = ".env"


settings = Settings()
