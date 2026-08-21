from fastapi import APIRouter, HTTPException, Query
import httpx
from services.firms import get_fires
from schemas.fire import FireDetection

router = APIRouter()

@router.get("/fires", response_model=list[FireDetection])
async def read_fires(
    bbox: str = Query(..., description="minLon,minLat,maxlon,maxLat"),
    days: int = Query(..., ge=1, le=7),
):

    try:
        return await get_fires(bbox, days)
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=502, detail="FIRMS API returned an error") from e
    except httpx.RequestError as e:
        raise HTTPException(status_code=502, detail="Could not reach FIRMS API") from e
