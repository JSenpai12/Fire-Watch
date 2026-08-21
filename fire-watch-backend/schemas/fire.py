from pydantic import BaseModel
from typing import Union

class FireDetection(BaseModel):
    latitude: float
    longitude: float
    brightness: float
    confidence: Union[str, int]
    acq_date: str
    acq_time: str
    frp: float
