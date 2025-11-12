import React, { useState, useEffect, useRef, useCallback } from 'react';

  const API_URL = 'https://latestnews24x7.com/backend2/api';

  // SVG Icons
  const UserIcon = () => (
    <svg style={{width: '100%', height: '100%'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const LockIcon = () => (
    <svg style={{width: '100%', height: '100%'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );

  const SendIcon = () => (
    <svg style={{width: '100%', height: '100%'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  );

  const CheckCheckIcon = () => (
    <svg style={{width: '100%', height: '100%'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 11 12 14 22 4"></polyline>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
    </svg>
  );

  const PaperclipIcon = () => (
    <svg style={{width: '100%', height: '100%'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
    </svg>
  );

  const ImageIcon = () => (
    <svg style={{width: '100%', height: '100%'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  );

  const VideoIcon = () => (
    <svg style={{width: '100%', height: '100%'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="23 7 16 12 23 17 23 7"></polygon>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    </svg>
  );

  const XIcon = () => (
    <svg style={{width: '100%', height: '100%'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  const DownloadIcon = () => (
    <svg style={{width: '100%', height: '100%'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  );

  const FileIcon = () => (
    <svg style={{width: '100%', height: '100%'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
      <polyline points="13 2 13 9 20 9"></polyline>
    </svg>
  );

  const AlertCircleIcon = () => (
    <svg style={{width: '100%', height: '100%'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  );

  const EyeIcon = () => (
    <svg style={{width: '100%', height: '100%'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg style={{width: '100%', height: '100%'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );

  export default function EncryptedChat() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authToken, setAuthToken] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [showAttachMenu, setShowAttachMenu] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const textareaRef = useRef(null);
    const [onlineUsers, setOnlineUsers] = useState(new Set());
    const [seenMessages, setSeenMessages] = useState(new Set());
    const [lastSeenMessageId, setLastSeenMessageId] = useState(null);
    // const [isUserScrolling, setIsUserScrolling] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);


    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // useEffect(() => {
    //   if (!isUserScrolling) {
    //     scrollToBottom();
    //   }
    // }, [messages, isUserScrolling]);

    useEffect(() => {
      const savedToken = localStorage.getItem('authToken');
      const savedUsername = localStorage.getItem('username');

      if (savedToken && savedUsername) {
        setAuthToken(savedToken);
        setUsername(savedUsername);
        setIsLoggedIn(true);
      }
    }, []);

    const markMessagesAsSeen = useCallback(async () => {
      if (!authToken || messages.length === 0) return;
      
      try {
        const unseenMessages = messages.filter(m => 
          m.username !== username && !seenMessages.has(m.id)
        );
        
        if (unseenMessages.length === 0) return;
        
        await fetch(`${API_URL}/messages/seen`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messageIds: unseenMessages.map(m => m.id),
            seenBy: username
          })
        });
        
        setSeenMessages(prev => {
          const newSet = new Set(prev);
          unseenMessages.forEach(m => newSet.add(m.id));
          return newSet;
        });
      } catch (error) {
        console.error('Error marking messages as seen:', error);
      }
    }, [authToken, messages, username, seenMessages]);

    const updateOnlineStatus = useCallback(async (isOnline) => {
      if (!authToken) return;
      
      try {
        await fetch(`${API_URL}/users/online`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, isOnline })
        });
      } catch (error) {
        console.error('Error updating online status:', error);
      }
    }, [authToken, username]);

    const fetchMessages = useCallback(async () => {
      if (!authToken) return;

      try {
        console.log("Fetching messages...");
        const response = await fetch(`${API_URL}/messages`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            console.warn("Session expired or token invalid, keeping session alive until user logout.");
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Messages Response Data:", data);

        // Update online users if provided
        if (data.onlineUsers) {
          setOnlineUsers(new Set(data.onlineUsers));
        }

        const allMessages = Array.isArray(data.messages) ? data.messages : data;

        // Sort by timestamp ascending (oldest → newest)
        const sorted = allMessages
          .map(m => ({
            ...m,
            localTimestamp: new Date(
              new Date(m.timestamp).getTime() + (5.5 * 60 * 60 * 1000)
            ),
            isSeen: m.seenBy && Array.isArray(m.seenBy) && m.seenBy.some(user => user !== username)
          }))
          .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        // Filter invalid / undecryptable messages
        const visibleMessages = sorted.filter(
          m => (m.username && m.username.trim() !== '') || (m.message && m.message.trim() !== '')
        );

        setMessages(visibleMessages);
        setError(null);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Failed to load messages. Please check your connection.');
      }
    }, [authToken, username]);

    useEffect(() => {
      if (messages.length > 0 && isLoggedIn) {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage.id && lastMessage.id !== lastSeenMessageId) {
          setLastSeenMessageId(lastMessage.id);
          markMessagesAsSeen();
        }
      }
    }, [messages, isLoggedIn, lastSeenMessageId, markMessagesAsSeen]);

    useEffect(() => {
      if (isLoggedIn && authToken) {
        updateOnlineStatus(true);
        
        const interval = setInterval(() => {
          updateOnlineStatus(true);
        }, 30000);
        
        return () => {
          clearInterval(interval);
          updateOnlineStatus(false);
        };
      }
    }, [isLoggedIn, authToken, updateOnlineStatus]);

    useEffect(() => {
      if (isLoggedIn && authToken) {
        fetchMessages();
        const interval = setInterval(fetchMessages, 1000); // Changed from 3000 to 1000ms
        return () => clearInterval(interval);
      }
    }, [isLoggedIn, authToken, fetchMessages]);

    // const fetchMessages = async () => {
    //   if (!authToken) return;

    //   try {
    //     console.log("Fetching messages...");
    //     const response = await fetch(`${API_URL}/messages`, {
    //       headers: {
    //         'Authorization': `Bearer ${authToken}`,
    //         'Content-Type': 'application/json'
    //       }
    //     });

    //     if (!response.ok) {
    //       if (response.status === 401 || response.status === 403) {
    //         // Only auto logout if token truly invalid (not just expired locally)
    //         console.warn("Session expired or token invalid, keeping session alive until user logout.");
    //         return;
    //       }
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }

    //     const data = await response.json();
    //     console.log("Messages Response Data:", data);

    //     // Update online users if provided
    //     if (data.onlineUsers) {
    //       setOnlineUsers(new Set(data.onlineUsers));
    //     }

    //     const allMessages = Array.isArray(data.messages) ? data.messages : data;

    //     // Sort by timestamp ascending (oldest → newest)
    //     const sorted = allMessages
    //       .map(m => ({
    //         ...m,
    //         localTimestamp: new Date(
    //           new Date(m.timestamp).getTime() + (5.5 * 60 * 60 * 1000) // Convert UTC → IST
    //         )
    //       }))
    //       .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    //     // Filter invalid / undecryptable messages
    //     const visibleMessages = sorted.filter(
    //       m => (m.username && m.username.trim() !== '') || (m.message && m.message.trim() !== '')
    //     );

    //     setMessages(visibleMessages);
    //     setError(null);
    //   } catch (error) {
    //     console.error('Error fetching messages:', error);
    //     setError('Failed to load messages. Please check your connection.');
    //   }
    // };

    const handleLogin = async () => {
      if (!username.trim() || !password.trim()) {
        setError('Please enter both username and password');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username.trim(), password: password.trim() })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Login failed');
        }

        // ✅ Save token to state AND localStorage
        setAuthToken(data.token);
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('username', username.trim());

        setIsLoggedIn(true);
        setPassword('');
        setError(null);
      } catch (error) {
        console.error('Login error:', error);
        setError(error.message || 'Login failed. Please check your credentials.');
      } finally {
        setLoading(false);
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (isLoggedIn) {
          handleSendMessage();
        } else {
          handleLogin();
        }
      }
    };

    const handlePaste = async (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          e.preventDefault();
          const blob = items[i].getAsFile();
          await handleFileSelect(blob, 'image');
        }
      }
    };

    const handleFileSelect = async (file, type = null) => {
      if (!file) return;

      const fileType = type || (file.type.startsWith('image/') ? 'image' : 
                                file.type.startsWith('video/') ? 'video' : 'file');
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAttachment = {
          id: Date.now(),
          name: file.name,
          type: fileType,
          size: file.size,
          data: e.target.result,
          mimeType: file.type
        };
        setAttachments(prev => [...prev, newAttachment]);
      };
      reader.readAsDataURL(file);
      setShowAttachMenu(false);
    };

    const removeAttachment = (id) => {
      setAttachments(prev => prev.filter(att => att.id !== id));
    };

    const formatFileSize = (bytes) => {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const handleSendMessage = async () => {
      if (!message.trim() && attachments.length === 0) return;

      const tempMessage = {
        id: 'temp-' + Date.now(),
        username,
        message: message.trim(),
        attachments: attachments,
        timestamp: new Date().toISOString(),
        createdBy: username,
        seenBy: [],
        isSeen: false,
        localTimestamp: new Date()
      };

      // Optimistically add message
      setMessages(prev => [...prev, tempMessage]);
      
      const messageContent = message.trim();
      const messageAttachments = [...attachments];
      
      setMessage('');
      setAttachments([]);
      setLoading(true);
      setError(null);
      
      try {
        const payload = {
          username,
          message: messageContent,
          attachments: messageAttachments
        };

        const response = await fetch(`${API_URL}/messages`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        console.log("Message sent successfully:", result);

        if (!response.ok) {
          // Remove temp message on error
          setMessages(prev => prev.filter(m => m.id !== tempMessage.id));
          
          if (response.status === 401) {
            setIsLoggedIn(false);
            setAuthToken('');
            setError('Session expired. Please login again.');
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Fetch immediately to replace temp message with real one
        await fetchMessages();
      } catch (error) {
        console.error('Error sending message:', error);
        setError('Failed to send message. Please try again.');
        // Remove temp message on error
        setMessages(prev => prev.filter(m => m.id !== tempMessage.id));
      } finally {
        setLoading(false);
      }
    };

    const formatTime = (timestamp) => {
      try {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      } catch {
        return '';
      }
    };    

    if (!isLoggedIn) {  
      return (
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            padding: '2rem',
            width: '100%',
            maxWidth: '400px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                background: '#14b8a6',
                padding: '1rem',
                borderRadius: '50%',
                width: '80px',
                height: '80px'
              }}>
                <UserIcon />
              </div>
            </div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#1f2937',
              marginBottom: '0.5rem'
            }}>
              Secure Chat
            </h1>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              color: '#6b7280',
              marginBottom: '2rem'
            }}>
              <div style={{width: '16px', height: '16px'}}><LockIcon /></div>
              <span>End-to-end encrypted</span>
            </div>

            {error && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '0.75rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#dc2626'
              }}>
                <div style={{width: '20px', height: '20px', flexShrink: 0}}>
                  <AlertCircleIcon />
                </div>
                <span style={{fontSize: '0.875rem'}}>{error}</span>
              </div>
            )}

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Username"
              maxLength={30}
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem 0.6rem',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                marginBottom: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#14b8a6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />

            <div style={{position: 'relative', marginBottom: '1.5rem'}}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Password"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.6rem',
                  paddingRight: '0.6rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#14b8a6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  color: '#6b7280'
                }}
              >
                <div style={{width: '20px', height: '20px'}}>
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </div>
              </button>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? '#9ca3af' : '#14b8a6',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '8px',
                fontWeight: '600',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!loading) e.target.style.background = '#0d9488';
              }}
              onMouseLeave={(e) => {
                if (!loading) e.target.style.background = '#14b8a6';
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{height: '100vh', background: '#f3f4f6', display: 'flex', flexDirection: 'column'}}>
        <div style={{
          background: '#14b8a6',
          color: 'white',
          padding: '1rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
              <div style={{
                background: '#0d9488',
                padding: '0.5rem',
                borderRadius: '50%',
                width: '40px',
                height: '40px'
              }}>
                <UserIcon />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h2 style={{fontWeight: '600', margin: 0}}>{username}</h2>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: onlineUsers.has(username) ? '#10b981' : '#6b7280',
                    boxShadow: onlineUsers.has(username) ? '0 0 0 2px rgba(16, 185, 129, 0.3)' : '0 0 0 2px rgba(107, 114, 128, 0.3)'
                  }} />
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#d1fae5'}}>
                <span>{onlineUsers.has(username) ? 'online' : 'offline'}</span>
                <span>•</span>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                  <div style={{width: '12px', height: '12px'}}><LockIcon /></div>
                  <span>Encrypted</span>
                </div>
              </div>
            </div>
            <button
            onClick={() => {
              setIsLoggedIn(false);
              setUsername('');
              setPassword('');
              setAuthToken('');
              setMessages([]);
              setAttachments([]);
              setError(null);
              localStorage.removeItem('authToken');
              localStorage.removeItem('username');
            }}  
              style={{
                fontSize: '0.875rem',
                background: '#0d9488',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#0f766e'}
              onMouseLeave={(e) => e.target.style.background = '#0d9488'}
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2',
            borderBottom: '1px solid #fecaca',
            padding: '1rem'
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#dc2626'
            }}>
              <div style={{width: '20px', height: '20px'}}>
                <AlertCircleIcon />
              </div>
              <span style={{fontSize: '0.875rem'}}>{error}</span>
            </div>
          </div>
        )}

            <div 
              style={{flex: 1, overflowY: 'auto', padding: '1rem', background: '#e0f2f1'}}
              onScroll={(e) => {
                const element = e.target;
                const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 100;
                // setIsUserScrolling(!isAtBottom);
                setShowScrollButton(!isAtBottom);
              }}
            >       
           <div style={{maxWidth: '1200px', margin: '0 auto'}}>
            {messages.length === 0 ? (
              <div style={{textAlign: 'center', color: '#9ca3af', marginTop: '5rem'}}>
                <div style={{width: '64px', height: '64px', margin: '0 auto 1rem', opacity: 0.5}}>
                  <LockIcon />
                </div>
                <p style={{fontSize: '1.125rem', margin: '0 0 0.5rem 0'}}>No messages yet</p>
                <p style={{fontSize: '0.875rem', margin: 0}}>Start the conversation!</p>
              </div>
            ) : (
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>      
              {(() => {
                  let lastDate = null; // Track date headers safely

                  return messages.map((msg, idx) => {
                    const isOwn = (msg.username === username) || (msg.createdBy === username);
                    const msgDate = new Date(msg.localTimestamp || msg.timestamp)
                      .toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });

                    const showDateHeader = msgDate !== lastDate;
                    if (showDateHeader) lastDate = msgDate;

                    // Format date header label
                    const todayDate = new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
                    const headerLabel = msgDate === todayDate ? 'Today' : msgDate;

                    return (
                      <React.Fragment key={idx}>
                        {showDateHeader && (
                          <div
                            style={{
                              textAlign: 'center',
                              color: '#6b7280',
                              fontSize: '0.75rem',
                              margin: '0.5rem 0'
                            }}
                          >
                            {headerLabel}
                          </div>
                        )}

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: isOwn ? 'flex-end' : 'flex-start'
                          }}
                        >
                          <div
                            style={{
                              maxWidth: '65%',
                              padding: '0.75rem 1rem',
                              borderRadius: '12px',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                              background: isOwn ? '#14b8a6' : 'white',
                              color: isOwn ? 'white' : '#1f2937',
                              borderBottomRightRadius: isOwn ? '2px' : '12px',
                              borderBottomLeftRadius: isOwn ? '12px' : '2px'
                            }}
                          >
                           {!isOwn && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <p
                                  style={{
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    color: '#0d9488',
                                    margin: '0 0 0.25rem 0'
                                  }}
                                >
                                  {msg.username || msg.createdBy || 'Unknown'}
                                </p>
                                {onlineUsers.has(msg.username || msg.createdBy) && (
                                  <div style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#10b981',
                                    marginBottom: '0.25rem'
                                  }} />
                                )}
                              </div>
                            )}
                            {msg.attachments && msg.attachments.length > 0 && (
                              <div style={{ marginBottom: msg.message ? '0.5rem' : 0 }}>
                                {msg.attachments.map((att, attIdx) => (
                                  <div key={attIdx} style={{ marginBottom: '0.5rem' }}>
                                    {att.type === 'image' && (
                                      <img
                                        src={att.data}
                                        alt={att.name}
                                        style={{
                                          maxWidth: '100%',
                                          borderRadius: '8px',
                                          display: 'block'
                                        }}
                                      />
                                    )}
                                    {att.type === 'video' && (
                                      <video
                                        controls
                                        style={{
                                          maxWidth: '100%',
                                          borderRadius: '8px',
                                          display: 'block'
                                        }}
                                      >
                                        <source src={att.data} type={att.mimeType} />
                                      </video>
                                    )}
                                    {att.type === 'file' && (
                                      <div
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '0.5rem',
                                          padding: '0.5rem',
                                          background: isOwn ? 'rgba(255,255,255,0.2)' : '#f3f4f6',
                                          borderRadius: '8px'
                                        }}
                                      >
                                        <div style={{ width: '24px', height: '24px' }}>
                                          <FileIcon />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                          <div
                                            style={{
                                              fontSize: '0.875rem',
                                              fontWeight: '500',
                                              overflow: 'hidden',
                                              textOverflow: 'ellipsis',
                                              whiteSpace: 'nowrap'
                                            }}
                                          >
                                            {att.name}
                                          </div>
                                          <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                                            {formatFileSize(att.size)}
                                          </div>
                                        </div>
                                        <a
                                          href={att.data}
                                          download={att.name}
                                          style={{
                                            width: '20px',
                                            height: '20px',
                                            color: 'inherit'
                                          }}
                                        >
                                          <DownloadIcon />
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {msg.message && (
                              <p style={{ margin: 0, wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                                {msg.message}
                              </p>
                            )}

                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                gap: '0.25rem',
                                marginTop: '0.25rem'
                              }}
                            >
                              <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                                {formatTime(msg.timestamp)}
                              </span>
                              {isOwn && (
                                <div style={{ 
                                  width: '12px', 
                                  height: '12px', 
                                  opacity: 0.8, 
                                  color: msg.isSeen ? '#ffffffff' : 'currentColor' 
                                }}>
                                  <CheckCheckIcon />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  });
                })()}


                <div ref={messagesEndRef} />
                {showScrollButton && (
                    <button
                      onClick={scrollToBottom}
                      style={{
                        position: 'fixed',
                        bottom: '100px',
                        right: '30px',
                        background: '#14b8a6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '48px',
                        height: '48px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
                      }}
                    >
                      <svg style={{width: '24px', height: '24px'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    </button>
                  )}
              </div>
            )}
          </div>
        </div>

        {attachments.length > 0 && (
          <div style={{
            background: 'white',
            borderTop: '1px solid #e5e7eb',
            padding: '1rem'
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              gap: '0.5rem',
              overflowX: 'auto'
            }}>
              {attachments.map((att) => (
                <div key={att.id} style={{
                  position: 'relative',
                  minWidth: '120px',
                  maxWidth: '120px',
                  height: '120px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '2px solid #e5e7eb'
                }}>
                  <button
                    onClick={() => removeAttachment(att.id)}
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      background: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10
                    }}
                  >
                    <div style={{width: '16px', height: '16px'}}>
                      <XIcon />
                    </div>
                  </button>
                  
                  {att.type === 'image' && (
                    <img
                      src={att.data}
                      alt={att.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                  
                  {att.type === 'video' && (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: '#1f2937',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <div style={{width: '32px', height: '32px'}}>
                        <VideoIcon />
                      </div>
                    </div>
                  )}
                  
                  {att.type === 'file' && (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: '#f3f4f6',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0.5rem'
                    }}>
                      <div style={{width: '32px', height: '32px', color: '#6b7280', marginBottom: '0.25rem'}}>
                        <FileIcon />
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        textAlign: 'center',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '100%'
                      }}>
                        {att.name}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{background: 'white', borderTop: '1px solid #e5e7eb', padding: '1rem'}}>
          <div style={{maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '0.5rem', alignItems: 'flex-end'}}>
            <div style={{position: 'relative'}}>
              <button
                onClick={() => setShowAttachMenu(!showAttachMenu)}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s',
                  width: '48px',
                  height: '48px'
                }}
                onMouseEnter={(e) => e.target.style.background = '#e5e7eb'}
                onMouseLeave={(e) => e.target.style.background = '#f3f4f6'}
              >
                <div style={{width: '24px', height: '24px', color: '#6b7280'}}>
                  <PaperclipIcon />
                </div>
              </button>
              
              {showAttachMenu && (
                <div style={{
                  position: 'absolute',
                  bottom: '60px',
                  left: 0,
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  padding: '0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  zIndex: 100
                }}>
                  <button
                    onClick={() => imageInputRef.current?.click()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      color: '#1f2937',
                      transition: 'background 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#f3f4f6'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    <div style={{width: '20px', height: '20px', color: '#8b5cf6'}}>
                      <ImageIcon />
                    </div>
                    <span>Image</span>
                  </button>
                  <button
                    onClick={() => videoInputRef.current?.click()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      color: '#1f2937',
                      transition: 'background 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#f3f4f6'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    <div style={{width: '20px', height: '20px', color: '#ef4444'}}>
                      <VideoIcon />
                    </div>
                    <span>Video</span>
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem 1rem',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      color: '#1f2937',
                      transition: 'background 0.2s',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#f3f4f6'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    <div style={{width: '20px', height: '20px', color: '#3b82f6'}}>
                      <FileIcon />
                    </div>
                    <span>File</span>
                  </button>
                </div>
              )}
            </div>

            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              style={{display: 'none'}}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file, 'image');
                e.target.value = '';
              }}
            />
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              style={{display: 'none'}}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file, 'video');
                e.target.value = '';
              }}
            />
            <input
              ref={fileInputRef}
              type="file"
              style={{display: 'none'}}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file, 'file');
                e.target.value = '';
              }}
            />

            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onPaste={handlePaste}
              placeholder="Type a message..."
              disabled={loading}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: '2px solid #e5e7eb',
                borderRadius: '24px',
                fontSize: '1rem',
                outline: 'none',
                resize: 'none',
                minHeight: '48px',
                maxHeight: '120px',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = '#14b8a6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || (!message.trim() && attachments.length === 0)}
              style={{
                background: '#14b8a6',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
                width: '48px',
                height: '48px',
                opacity: (loading || (!message.trim() && attachments.length === 0)) ? 0.5 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading && (message.trim() || attachments.length > 0)) {
                  e.target.style.background = '#0d9488';
                }
              }}
              onMouseLeave={(e) => e.target.style.background = '#14b8a6'}
            >
              <div style={{width: '24px', height: '24px'}}>
                <SendIcon />
              </div>
            </button>
          </div>
        </div>
      </div>
      </div>

    );
  }