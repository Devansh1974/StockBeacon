import React, { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All News');
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasPaid, setHasPaid] = useState(false);

  const categories = ['All News', 'Stocks', 'Crypto', 'Economy', 'Technology'];
  const API_KEY = 'BAOT023L0UKYRFLD';

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://www.alphavantage.co/query', {
        params: {
          function: 'NEWS_SENTIMENT',
          apikey: API_KEY,
          limit: 100,
          topics: 'technology,finance,economy',
        },
      });

      const transformedNews = response.data.feed?.map((article) => ({
        id: article.banner_image || Date.now().toString(),
        title: article.title,
        url: article.url,
        source: article.source,
        publishedAt: article.time_published,
        category: article.topics[0]?.topic || 'General',
      })) || [];

      setNewsArticles(transformedNews);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch news. Please try again.');
      setLoading(false);
    }
  };

  const filteredNews = newsArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All News' ||
      (article.category && article.category.toLowerCase() === selectedCategory.toLowerCase());
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Razorpay script loader
  useEffect(() => {
    const container = document.getElementById('razorpay-inline-button');
    if (container) {
      container.innerHTML = ''; // Clear existing content
  
      const form = document.createElement('form');
      const script = document.createElement('script');
  
      script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
      script.setAttribute('data-payment_button_id', 'pl_QDRqMAJ3OcUiFu');
      script.async = true;
  
      form.appendChild(script);
      container.appendChild(form);
    }
  }, []);
  

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">
      {/* Pay for Premium Section */}
      {!hasPaid && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-center">
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">
            Unlock Premium Market News
          </h2>
          <p className="text-sm text-yellow-700 mb-3">
            Subscribe for a basic amount to access the latest premium financial news.
          </p>
          <div id="razorpay-inline-button" className="inline-block" />
          <button
            onClick={() => setHasPaid(true)}
            className="block mt-2 text-xs text-blue-600 underline"
          >
            I have paid (dev mode)
          </button>
        </div>
      )}

      {/* Market News Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Market News</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search news..."
            className="pl-10 pr-4 py-2 border rounded-lg w-64 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* News Categories */}
      <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm rounded-full border transition ${
              selectedCategory === category ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="space-y-6">
        {hasPaid ? (
          filteredNews.length > 0 ? (
            filteredNews.map((news) => (
              <div
                key={news.id}
                className="border-b pb-4 hover:bg-gray-50 transition cursor-pointer"
                onClick={() => window.open(news.url, '_blank')}
              >
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded mb-2 inline-block">
                  {news.category}
                </span>
                <h3 className="text-lg font-bold">{news.title}</h3>
                <div className="text-sm text-gray-500 mt-1">
                  <span>{news.source}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(news.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No news found matching your criteria.</p>
          )
        ) : (
          <p className="text-gray-400 italic text-center mt-8">
            Pay above to unlock the premium news feed.
          </p>
        )}
      </div>
    </div>
  );
};

export default News;
