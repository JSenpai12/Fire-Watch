import csv
import io
import httpx
from config import MAP_KEY
from schemas.fire import FireDetection

FIRMS_BASE_URL="https://firms.modaps.eosdis.nasa.gov/api/area/csv"
SOURCE= "VIIRS_SNPP_NRT"

async def get_fires(bbox: str, days: int) -> list[FireDetection]:
    url = f"{FIRMS_BASE_URL}/{MAP_KEY}/{SOURCE}/{bbox}/{days}"

    async with httpx.AsyncClient() as client:
        response = await client.get(url, timeout=15.0)
        response.raise_for_status()


    csv_text = response.text
    reader = csv.DictReader(io.StringIO(csv_text))

    detections = []
    for row in reader:
        detections.append(
            FireDetection(
                latitude=float(row["latitude"]),
                longitude=float(row["longitude"]),
                brightness=float(row["bright_ti4"]),
                confidence=row["confidence"],
                acq_date=row["acq_date"],
                acq_time=row["acq_time"],
                frp=float(row["frp"]),
            )
        )
    return detections
