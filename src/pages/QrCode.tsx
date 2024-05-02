import QRCodeComponent from "../components/QR/QRCodeComponent";

 
const QrCode = () => {
    const qrCodeValue = "https://example.com";
    return (
        <div>
    
      <QRCodeComponent value={qrCodeValue} />
        </div>
    );
};

export default QrCode;