export default function handler(req, res) {
  res.status(200).json({
    message: 'PiePay Indexer is running',
    timestamp: new Date().toISOString(),
    version: '0.1.0'
  });
}