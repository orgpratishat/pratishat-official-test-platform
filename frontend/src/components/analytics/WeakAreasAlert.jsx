// import React from 'react';
// import Card from '../ui/Card';
// import Button from '../ui/Button';
// import { AlertCircle } from 'lucide-react';


// const WeakAreasAlert = ({ topics, onPractice }) => (
//   <Card className="p-6 mb-6 bg-red-50 border border-red-200">
//     <div className="flex items-center mb-4">
//       <ExclamationCircle className="w-6 h-6 text-red-600 mr-2" />
//       <h3 className="text-lg font-semibold text-red-600">Weak Areas</h3>
//     </div>
//     <ul className="list-disc list-inside text-gray-700 mb-4">
//       {topics.map((topic, idx) => (
//         <li key={idx}>{topic}</li>
//       ))}
//     </ul>
//     <Button variant="danger" onClick={() => onPractice(topics)}>
//       Practice Now
//     </Button>
//   </Card>
// );

// export default WeakAreasAlert;

// src/components/alerts/WeakAreasAlert.jsx
import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { CircleAlert } from 'lucide-react'; // or use AlertCircle / TriangleAlert

const WeakAreasAlert = ({ topics = [], onPractice }) => (
  <Card className="p-6 mb-6 bg-red-50 border border-red-200">
    <div className="flex items-center mb-4">
      <CircleAlert className="w-6 h-6 text-red-600 mr-2" />
      <h3 className="text-lg font-semibold text-red-600">Weak Areas</h3>
    </div>
    <ul className="list-disc list-inside text-gray-700 mb-4">
      {topics.map((topic, idx) => (
        <li key={idx}>{topic}</li>
      ))}
    </ul>
    <Button variant="danger" onClick={() => onPractice?.(topics)}>
      Practice Now
    </Button>
  </Card>
);

export default WeakAreasAlert;
