import { useState } from 'react';

// Import necessary types from the Web Bluetooth API
type RequestDeviceOptions = {
  acceptAllDevices: boolean;
  optionalServices?: string[];
};

type BluetoothRemoteGATTServer = {
  // Define properties and methods of BluetoothRemoteGATTServer if needed
  connect: () => Promise<void>;
  getPrimaryService: (service: string) => Promise<BluetoothRemoteGATTService>;
};

type BluetoothRemoteGATTService = {
  getCharacteristic: (characteristic: string) => Promise<BluetoothRemoteGATTCharacteristic>;
};

type BluetoothRemoteGATTCharacteristic = {
  writeValue: (value: BufferSource) => Promise<void>;
};

type BluetoothDevice = {
  id: string;
  name?: string;
  gatt?: BluetoothRemoteGATTServer;
};

// Extend the Navigator type to include the `bluetooth` property
interface NavigatorWithBluetooth extends Navigator {
  bluetooth: {
    requestDevice: (options: RequestDeviceOptions) => Promise<BluetoothDevice>;
  };
}

const FindMyPhone = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [device, setDevice] = useState<BluetoothDevice | null>(null);

  const connectToBluetooth = async () => {
    try {
      // Use the extended Navigator type
      const navigatorWithBluetooth = navigator as NavigatorWithBluetooth;

      const device = await navigatorWithBluetooth.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service']
      });

      if (device.gatt) {
        await device.gatt.connect();
        setDevice(device);
        setIsConnected(true);
        setMessage('Connected to device. You can now ring your phone.');
      }
    } catch {
      // Handle connection failure
      setMessage('Failed to connect to Bluetooth device.');
    }
  };

  const ringPhone = async () => {
    if (isConnected && device && device.gatt) {
      try {
        const service = await device.gatt.getPrimaryService('battery_service');
        const characteristic = await service.getCharacteristic('battery_level');
        await characteristic.writeValue(new TextEncoder().encode('ring'));

        setMessage('Ringing your phone...');
        // Simulate ringing functionality
        setTimeout(() => {
          setMessage('Your phone is ringing.');
        }, 2000);
      } catch {
        setMessage('Failed to ring the phone.');
      }
    } else {
      setMessage('Please connect to a Bluetooth device first.');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Find My Phone</h1>
      <p className="mb-4">{message || 'Connect to your Bluetooth device to find your phone.'}</p>
      <div className="space-x-4">
        <button onClick={connectToBluetooth} className="btn btn-primary">Connect to Bluetooth</button>
        <button onClick={ringPhone} className="btn btn-secondary">Ring Phone</button>
      </div>
    </div>
  );
};

export default FindMyPhone;