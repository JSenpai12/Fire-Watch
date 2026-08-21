import os
from dotenv import load_dotenv

load_dotenv()

MAP_KEY = os.getenv("MAP_KEY")


if not MAP_KEY:
    raise RuntimeError("MAP_KEY environment variable is not set")
