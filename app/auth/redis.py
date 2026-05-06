# app/auth/redis.py
from redis.asyncio import Redis
from app.core.config import get_settings

settings = get_settings()

async def get_redis():
    if not hasattr(get_redis, "redis"):
        get_redis.redis = Redis.from_url(
            settings.REDIS_URL or "redis://redis:6379/0",
            decode_responses=True
        )
    return get_redis.redis

async def add_to_blacklist(jti: str, exp: int):
    redis = await get_redis()
    await redis.set(f"blacklist:{jti}", "1", ex=exp)

async def is_blacklisted(jti: str) -> bool:
    redis = await get_redis()
    return await redis.exists(f"blacklist:{jti}")