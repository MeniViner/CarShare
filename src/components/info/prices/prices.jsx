// import React, { useState } from 'react';
// import PriceList from './priceList';
// import AdditionalCharges from './additionalCharges';
// import '../../../styles/prices.css';

// const Prices = () => {
//   const [activeTab, setActiveTab] = useState('priceList');

//   return (
//     <div className="prices-container">
//       <div className="prices-header">
//         <h1>prices</h1>
//       </div>
//       <div className="tab-header">
//         <button 
//           className={`tab-button ${activeTab === 'priceList' ? 'active' : ''}`}
//           onClick={() => setActiveTab('priceList')}
//         >
//           מחירים
//         </button>
//         <button 
//           className={`tab-button ${activeTab === 'additionalCharges' ? 'active' : ''}`}
//           onClick={() => setActiveTab('additionalCharges')}
//         >
//           חיובים נוספים
//         </button>
//       </div>
//       <div className="tab-content">
//         {activeTab === 'priceList' && <PriceList />}
//         {activeTab === 'additionalCharges' && <AdditionalCharges />}
//       </div>
//     </div>
//   );
// };

// export default Prices;



import React, { useState } from 'react';
import PriceList from './priceList';
import AdditionalCharges from './additionalCharges';
import '../../../styles/prices.css';

const Prices = () => {
  const [activeTab, setActiveTab] = useState('priceList');

  return (
    <div className="prices-container">
      <div className="prices-header">
        <h1>מחירון</h1>
      </div>
      <div className="tab-header">
        <button
          className={`tab-button ${activeTab === 'priceList' ? 'active' : ''}`}
          onClick={() => setActiveTab('priceList')}
        >
          מחירון
        </button>
        <button
          className={`tab-button ${activeTab === 'additionalCharges' ? 'active' : ''}`}
          onClick={() => setActiveTab('additionalCharges')}
        >
          חיובים נוספים
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'priceList' && <PriceList />}
        {activeTab === 'additionalCharges' && <AdditionalCharges />}
      </div>
    </div>
  );
};

export default Prices;