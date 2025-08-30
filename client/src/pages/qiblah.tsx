import { useState, useEffect } from "react";
import { Navigation, MapPin, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export default function Qiblah() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [qiblahDirection, setQiblahDirection] = useState<number>(0);
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Kaaba coordinates
  const KAABA_LAT = 21.4225;
  const KAABA_LNG = 39.8262;

  const calculateQiblahDirection = (lat: number, lng: number): number => {
    const phi1 = (lat * Math.PI) / 180;
    const phi2 = (KAABA_LAT * Math.PI) / 180;
    const deltaLambda = ((KAABA_LNG - lng) * Math.PI) / 180;

    const y = Math.sin(deltaLambda) * Math.cos(phi2);
    const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);

    const bearing = (Math.atan2(y, x) * 180) / Math.PI;
    return (bearing + 360) % 360;
  };

  const getLocation = () => {
    setIsLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const locationData = { latitude, longitude, accuracy };
        setLocation(locationData);
        
        const qiblah = calculateQiblahDirection(latitude, longitude);
        setQiblahDirection(qiblah);
        setIsLoading(false);
      },
      (error) => {
        setError(`Location error: ${error.message}`);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  useEffect(() => {
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        // iOS uses webkitCompassHeading, Android uses alpha
        const heading = (event as any).webkitCompassHeading || (360 - event.alpha);
        setDeviceHeading(heading);
      }
    };

    const requestOrientationPermission = async () => {
      if ('DeviceOrientationEvent' in window && 'requestPermission' in (DeviceOrientationEvent as any)) {
        // iOS 13+ requires permission
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
          } else {
            setError("Device orientation permission denied");
          }
        } catch (error) {
          setError("Error requesting device orientation permission");
        }
      } else {
        // Android and older iOS
        window.addEventListener('deviceorientation', handleDeviceOrientation);
      }
    };

    requestOrientationPermission();

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  const compassRotation = location ? qiblahDirection - deviceHeading : 0;
  const accuracy = location ? Math.round(location.accuracy) : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border px-4 py-4">
        <div className="flex items-center justify-center">
          <h1 className="text-xl font-semibold text-foreground">Qiblah Direction</h1>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-6 max-w-md mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground">
            Find the direction towards the Holy Kaaba in Mecca
          </p>
        </div>

        {/* Get Location Button */}
        <div className="text-center mb-8">
          <button
            data-testid="get-location-button"
            onClick={getLocation}
            disabled={isLoading}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                <span>Getting Location...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Get My Location</span>
              </div>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {/* Location Info */}
        {location && (
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-foreground mb-2">Location Details</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Latitude: {location.latitude.toFixed(6)}°</p>
              <p>Longitude: {location.longitude.toFixed(6)}°</p>
              <p>Accuracy: ±{accuracy} meters</p>
              <p>Qiblah Direction: {Math.round(qiblahDirection)}°</p>
            </div>
          </div>
        )}

        {/* Compass */}
        <div className="flex justify-center mb-8">
          <div className="relative w-64 h-64">
            {/* Compass Circle */}
            <div className="w-full h-full rounded-full border-4 border-muted bg-card shadow-lg relative overflow-hidden">
              {/* Direction Markers */}
              <div className="absolute inset-2 rounded-full border border-border">
                {/* North marker */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 text-xs font-bold text-foreground">
                  N
                </div>
                {/* East marker */}
                <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 text-xs font-bold text-foreground">
                  E
                </div>
                {/* South marker */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 text-xs font-bold text-foreground">
                  S
                </div>
                {/* West marker */}
                <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 text-xs font-bold text-foreground">
                  W
                </div>
              </div>

              {/* Qiblah Indicator */}
              {location && (
                <div
                  className="absolute top-1/2 left-1/2 w-1 h-20 bg-primary origin-bottom transform -translate-x-1/2 -translate-y-full transition-transform duration-500"
                  style={{
                    transform: `translate(-50%, -100%) rotate(${compassRotation}deg)`,
                  }}
                >
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-primary"></div>
                  </div>
                </div>
              )}

              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

              {/* Compass Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-6">
                <Compass className={cn("w-8 h-8 text-muted-foreground", !location && "animate-pulse")} />
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-2 flex items-center">
            <Navigation className="w-4 h-4 mr-2" />
            Instructions
          </h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Tap "Get My Location" to find your position</li>
            <li>• Hold your device flat and rotate yourself</li>
            <li>• The green arrow points towards Qiblah</li>
            <li>• Ensure location and compass permissions are enabled</li>
          </ul>
        </div>

        {/* Accuracy Warning */}
        {location && accuracy > 100 && (
          <div className="mt-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
            <p className="text-yellow-700 dark:text-yellow-300 text-xs">
              ⚠️ Location accuracy is {accuracy}m. For better results, go outdoors or near a window.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}