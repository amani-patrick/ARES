# settings.py

import os

class Settings:
    def __init__(self):
        self.database_url = os.getenv("DATABASE_URL", "sqlite:///cyber_arena.db")
        self.redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")
        self.api_key = os.getenv("API_KEY", "default_api_key")
        self.log_level = os.getenv("LOG_LEVEL", "INFO")

settings = Settings()
