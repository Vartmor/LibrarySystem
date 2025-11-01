import { useEffect } from 'react';

function Toast({ type, title, message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const borderColor = type === 'success' ? 'border-green-500' : 'border-red-500';

  return (
    <div className={`fixed top-20 right-5 bg-white border-l-4 ${borderColor} shadow-lg p-4 rounded-md min-w-[300px] max-w-[400px] z-50`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-bold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600 mt-1">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default Toast;
