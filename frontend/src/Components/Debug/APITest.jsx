import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const APITest = () => {
  const dispatch = useDispatch();
  const [testResult, setTestResult] = useState('');

  const testAPI = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/health');
      const data = await response.json();
      setTestResult(`✅ API Connection: ${data.message}`);
    } catch (error) {
      setTestResult(`❌ API Connection Failed: ${error.message}`);
    }
  };

  useEffect(() => {
    testAPI();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-zinc-800 p-4 rounded-lg text-white text-sm z-50">
      <div className="font-semibold mb-2">Integration Status:</div>
      <div>{testResult}</div>
    </div>
  );
};

export default APITest;
