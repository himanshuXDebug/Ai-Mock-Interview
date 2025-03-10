"use client"
import { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import blogData from './data/blogs.json';

export default function Blog() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState(blogData);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [toastShown, setToastShown] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!toastShown) {
        toast.success('Blog content loaded successfully!');
        setToastShown(true);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [toastShown]);

  useEffect(() => {
    let results = blogData;

    if (searchTerm) {
      results = results.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.author && blog.author.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (activeFilter !== 'all') {
      results = results.filter(blog =>
        blog.tags && blog.tags.some(tag => tag.toLowerCase() === activeFilter.toLowerCase())
      );
    }

    setFilteredBlogs(results);
  }, [searchTerm, activeFilter]);

  const essentialTags = ['all', 'AI Interviews', 'Mock Sessions', 'Technical Prep', 'Behavioral Questions'];

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    toast.info(`Reading: ${blog.title}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const formatDate = (dateString) => {
    return new Date(dateString || new Date()).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    toast.info(`Filtered by: ${filter === 'all' ? 'All Posts' : filter}`);
  };

  const handleSubscription = () => {
    if (subscribed) {
      toast.info('Unsubscribed from newsletter!');
    } else {
      toast.success('Subscribed to newsletter!');
    }
    setSubscribed(!subscribed);
  };
  


  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 dark:text-white w-full">
      
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 w-full">
        <div className="max-w-full mx-auto py-8 px-4 sm:py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            AI Interview Insights
          </h1>
          <p className="mt-1 max-w-3xl text-base text-purple-100">
            Expert advice and strategies to master your technical and behavioral interviews
          </p>
        </div>
      </div>

      <div className="w-full mx-auto mt-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
            {essentialTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleFilterChange(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === tag
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
              >
                {tag === 'all' ? 'All Posts' : tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-64">
                <div className="animate-pulse p-6">
                  <div className="flex items-center">
                    <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-10 w-10"></div>
                    <div className="ml-3 flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="mt-2 h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="mt-4 space-y-3">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredBlogs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative p-6">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600"></div>

                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-indigo-900"
                        src={blog.authorAvatar || "/avatars/Author.png"}
                        alt="Author avatar"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{blog.author || "Author"}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{blog.date}</p>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 mb-2">
                    {blog.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                    {blog.description || blog.excerpt}
                  </p>

                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                        >
                          {tag}
                        </span>
                      ))}
                      {blog.tags.length > 2 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                          +{blog.tags.length - 2} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => openModal(blog)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
                    >
                      Read
                      <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {blog.readTime || "5"} min
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No blogs found</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">Try adjusting your search or filter.</p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('all');
                  toast.success('Filters cleared!');
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}
      </main>

      <AnimatePresence>
        {isModalOpen && selectedBlog && (
          <div className="fixed inset-0 z-50 overflow-auto">
            <div className="flex items-start justify-center min-h-screen p-4 pt-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
                onClick={closeModal}
              />

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl mx-auto max-w-3xl w-full"
              >
                <div className="absolute top-0 right-0 pt-4 pr-4 z-10">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-white dark:bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="h-2 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"></div>

                <div className="px-4 pt-5 pb-4 sm:p-6 max-h-[70vh] overflow-y-auto">
                  <div className="text-left w-full">
                    <h3 className="text-2xl leading-6 font-bold text-gray-900 dark:text-white mb-4">
                      {selectedBlog.title}
                    </h3>

                    <div className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                      <img
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500"
                        src={selectedBlog.authorAvatar || "/avatars/Author.png"}
                        alt="Author avatar"
                      />

                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-900 dark:text-white">{selectedBlog.author || "Author"}</p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span>{formatDate(selectedBlog.date)}</span>
                          <span className="mx-2">•</span>
                          <span className="flex items-center">
                            <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            {selectedBlog.readTime || "5"} min read
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="prose prose-indigo max-w-none dark:prose-invert">
                      {(selectedBlog.content || selectedBlog.description)
                        .split('\n\n')
                        .map((paragraph, idx) => (
                          <p key={idx} className="mb-4 text-gray-700 dark:text-gray-300">
                            {paragraph}
                          </p>
                        ))}

                      {selectedBlog.features && selectedBlog.features.length > 0 && (
                        <>
                          <h4 className="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">Key Features:</h4>
                          <ul className="list-disc pl-5 space-y-2">
                            {selectedBlog.features.map((feature, idx) => (
                              <li key={idx} className="text-gray-700 dark:text-gray-300">{feature}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>

                    {selectedBlog.tags && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {selectedBlog.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      toast.success('Article saved to bookmarks!');
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    Bookmark
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <section className="bg-indigo-700 dark:bg-indigo-900 w-full">
        <div className="w-full mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-white">
            Ready to ace your next interview?
            <span className="block text-indigo-200 text-sm mt-1">Sign up for weekly tips.</span>
          </h2>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={handleSubscription}
              className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}