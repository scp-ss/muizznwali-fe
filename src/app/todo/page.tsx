'use client';

import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '../../../contexts/AuthContext';
import AuthForm from '../../../components/AuthForm';
import { signOutUser } from '../../../lib/authHelpers';
import '../todo.css';
import { 
  createTask, 
  listenToUserTasks, 
  stopListeningToTasks, 
  toggleTaskCompletion,
  deleteTask,
  addComment,
  editTask,
  editComment,
  deleteComment,
  TodoTask, 
  Priority, 
  PRIORITY_COLORS, 
  PRIORITY_LABELS,
  Comment 
} from '../../../lib/todoHelpers';

function TodoApp() {
  const { user, userProfile, loading } = useAuth();
  const [tasks, setTasks] = useState<TodoTask[]>([]);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  
  // New task form
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState<Priority>('normal');
  
  // Comments
  const [showComments, setShowComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  
  // Filter and sort
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'date' | 'alphabetical'>('priority');

  // Editing states
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [isUpdatingTask, setIsUpdatingTask] = useState(false);
  
  // Edit task form
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPriority, setEditPriority] = useState<Priority>('normal');
  
  // Edit comment form
  const [editCommentText, setEditCommentText] = useState('');

  // Listen to real-time task updates
  useEffect(() => {
    if (user) {
      const tasksRef = listenToUserTasks(user.uid, (updatedTasks) => {
        const sortedTasks = updatedTasks.sort((a, b) => {
          if (sortBy === 'priority') {
            const priorityOrder = { urgent: 4, high: 3, normal: 2, low: 1 };
            if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
              return priorityOrder[b.priority] - priorityOrder[a.priority];
            }
            return b.createdAt - a.createdAt;
          } else if (sortBy === 'date') {
            return b.createdAt - a.createdAt;
          } else {
            return a.title.localeCompare(b.title);
          }
        });
        setTasks(sortedTasks);
      });

      return () => {
        if (tasksRef) {
          stopListeningToTasks(tasksRef);
        }
      };
    }
  }, [user, sortBy]);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
    urgent: tasks.filter(t => t.priority === 'urgent' && !t.completed).length,
  };

  const handleCreateTask = async () => {
    if (!user || !newTitle.trim()) return;

    setIsCreatingTask(true);
    const taskId = await createTask(user.uid, newTitle, newDescription, newPriority);
    if (taskId) {
      setNewTitle('');
      setNewDescription('');
      setNewPriority('normal');
      setShowNewTaskForm(false);
    }
    setIsCreatingTask(false);
  };

  const handleToggleComplete = async (taskId: string, completed: boolean) => {
    if (!user) return;
    await toggleTaskCompletion(user.uid, taskId, !completed);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!user) return;
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTask(user.uid, taskId);
    }
  };

  const handleAddComment = async (taskId: string) => {
    if (!user || !userProfile || !newComment.trim()) return;
    
    await addComment(user.uid, taskId, newComment, userProfile.displayName);
    setNewComment('');
  };

  const handleSignOut = async () => {
    await signOutUser();
  };

  // Edit task handlers
  const handleEditTask = (task: TodoTask) => {
    setEditingTask(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditPriority(task.priority);
  };

  const handleSaveTaskEdit = async (taskId: string) => {
    if (!user || !editTitle.trim()) return;

    setIsUpdatingTask(true);
    const success = await editTask(user.uid, taskId, editTitle, editDescription, editPriority);
    if (success) {
      setEditingTask(null);
      setEditTitle('');
      setEditDescription('');
      setEditPriority('normal');
    }
    setIsUpdatingTask(false);
  };

  const handleCancelTaskEdit = () => {
    setEditingTask(null);
    setEditTitle('');
    setEditDescription('');
    setEditPriority('normal');
  };

  // Comment edit handlers
  const handleEditComment = (comment: Comment) => {
    setEditingComment(comment.id);
    setEditCommentText(comment.text);
  };

  const handleSaveCommentEdit = async (taskId: string, commentId: string) => {
    if (!user || !editCommentText.trim()) return;

    const success = await editComment(user.uid, taskId, commentId, editCommentText);
    if (success) {
      setEditingComment(null);
      setEditCommentText('');
    }
  };

  const handleCancelCommentEdit = () => {
    setEditingComment(null);
    setEditCommentText('');
  };

  const handleDeleteComment = async (taskId: string, commentId: string) => {
    if (!user) return;
    if (confirm('Are you sure you want to delete this comment?')) {
      await deleteComment(user.uid, taskId, commentId);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading your workspace...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="todo-page">
      <div className="todo-container">
        
        {/* Hero Header */}
        <div className="hero-header">
          <div className="hero-background"></div>
          <div className="hero-content">
            <div className="hero-layout">
              <div className="hero-main">
                <h1 className="hero-title">
                  Your Todo Universe
                </h1>
                <p className="hero-subtitle">
                  Welcome back, <span className="hero-name">{userProfile?.displayName}</span>! ✨
                </p>
                
                {/* Quick Stats */}
                <div className="stats-container">
                  <div className="stat-item stat-total">
                    <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="stat-text">{stats.total} total</span>
                  </div>
                  <div className="stat-item stat-completed">
                    <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="stat-text">{stats.completed} done</span>
                  </div>
                  <div className="stat-item stat-active">
                    <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="stat-text">{stats.active} active</span>
                  </div>
                  {stats.urgent > 0 && (
                    <div className="stat-item stat-urgent">
                      <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span className="stat-text">{stats.urgent} urgent</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="header-actions">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="sign-out-button"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="controls-container">
          
          {/* New Task Button */}
          <div>
            <button
              onClick={() => setShowNewTaskForm(true)}
              className="create-task-button"
            >
              {/* Animated shine effect */}
              <div className="create-task-shine"></div>
              
              {/* Sparkle elements */}
              <div className="create-task-sparkle-1"></div>
              <div className="create-task-sparkle-2"></div>
              
              <div className="create-task-content">
                <div className="create-task-icon-wrapper">
                  <svg className="create-task-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span className="create-task-text">✨ Create Magic</span>
              </div>
            </button>
          </div>

          {/* Filters & Sort */}
          <div className="filters-container">
            
            {/* Filter Pills */}
            <div className="filter-pills">
              {(['all', 'active', 'completed'] as const).map((filterOption, index) => {
                const isActive = filter === filterOption;
                const icons = ['🌟', '⚡', '✅'];
                
                return (
                  <button
                    key={filterOption}
                    onClick={() => setFilter(filterOption)}
                    className={`filter-pill ${isActive ? 'active' : 'inactive'} ${isActive ? `filter-${filterOption}` : ''}`}
                  >
                    {/* Shimmer effect */}
                    {isActive && (
                      <div className="filter-shimmer"></div>
                    )}
                    
                    <div className="filter-content">
                      <span className="filter-icon">{icons[index]}</span>
                      <span className="filter-text">
                        {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                      </span>
                      {isActive && (
                        <span className="filter-count">
                          {filterOption === 'all' ? stats.total : 
                           filterOption === 'active' ? stats.active : stats.completed}
                        </span>
                      )}
                    </div>
                    
                    {/* Glow effect */}
                    {isActive && <div className="filter-glow"></div>}
                  </button>
                );
              })}
            </div>

            {/* Sort Dropdown */}
            <div className="sort-dropdown-wrapper">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="sort-dropdown"
              >
                <option value="priority">🎯 Priority Magic</option>
                <option value="date">📅 Time Travel</option>
                <option value="alphabetical">🔤 Alpha Sort</option>
              </select>
              
              {/* Custom dropdown arrow */}
              <div className="sort-arrow">
                <div className="sort-arrow-bg">
                  <svg className="sort-arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Sparkle decoration */}
              <div className="sort-sparkle"></div>
            </div>
          </div>
        </div>

        {/* New Task Form Modal */}
        {showNewTaskForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">Create New Task</h3>
                <button
                  onClick={() => {
                    setShowNewTaskForm(false);
                    setNewTitle('');
                    setNewDescription('');
                    setNewPriority('normal');
                  }}
                  className="modal-close"
                >
                  <svg className="modal-close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="form-container">
                <div className="form-group">
                  <label className="form-label">Task Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="form-input"
                    placeholder="Enter your awesome task..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description (Optional)</label>
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="form-textarea"
                    placeholder="Add more details..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Priority Level</label>
                  <div className="priority-grid">
                    {Object.entries(PRIORITY_LABELS).map(([key, label]) => {
                      const colors = PRIORITY_COLORS[key as Priority];
                      return (
                        <button
                          key={key}
                          onClick={() => setNewPriority(key as Priority)}
                          className={`priority-button ${newPriority === key ? 'active' : ''}`}
                          style={newPriority === key ? {
                            borderColor: colors.border.includes('red') ? '#dc2626' : 
                                        colors.border.includes('orange') ? '#ea580c' :
                                        colors.border.includes('yellow') ? '#ca8a04' : '#2563eb',
                            backgroundColor: colors.bg.includes('red') ? '#fef2f2' :
                                           colors.bg.includes('orange') ? '#fff7ed' :
                                           colors.bg.includes('yellow') ? '#fefce8' : '#eff6ff',
                            color: colors.text.includes('red') ? '#991b1b' :
                                  colors.text.includes('orange') ? '#9a3412' :
                                  colors.text.includes('yellow') ? '#a16207' : '#1e40af'
                          } : {}}
                        >
                          <div className="priority-content">
                            <div 
                              className="priority-dot" 
                              style={{
                                backgroundColor: colors.badge.includes('red') ? '#dc2626' :
                                               colors.badge.includes('orange') ? '#ea580c' :
                                               colors.badge.includes('yellow') ? '#ca8a04' : '#2563eb'
                              }}
                            ></div>
                            <span>{label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    onClick={handleCreateTask}
                    disabled={isCreatingTask || !newTitle.trim()}
                    className="form-submit"
                  >
                    {isCreatingTask ? (
                      <div className="loading-content-form">
                        <div className="loading-spinner-form"></div>
                        <span>Creating...</span>
                      </div>
                    ) : (
                      'Create Task'
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setShowNewTaskForm(false);
                      setNewTitle('');
                      setNewDescription('');
                      setNewPriority('normal');
                    }}
                    className="form-cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tasks List */}
        <div className="tasks-grid">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-bg">
                <div className="empty-state-circle">
                  <div className="empty-state-gradient"></div>
                </div>
                <div className="empty-state-content">
                  <svg className="empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="empty-state-title">
                    {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
                  </h3>
                  <p className="empty-state-description">
                    {filter === 'all' 
                      ? "Ready to conquer the day? Create your first task and let's get things done!"
                      : `You don't have any ${filter} tasks right now. Great job! 🎉`
                    }
                  </p>
                  {filter === 'all' && (
                    <button
                      onClick={() => setShowNewTaskForm(true)}
                      className="empty-state-button"
                    >
                      Create Your First Task
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="tasks-grid">
              {filteredTasks.map((task, index) => {
                const colors = PRIORITY_COLORS[task.priority];
                const getAnimationClass = () => {
                  if (index === 0) return 'animate-slideUp';
                  if (index <= 10) return `animate-slideUp-delay-${index}`;
                  return 'animate-slideUp-delay-10';
                };
                
                return (
                  <div
                    key={task.id}
                    className={`task-card ${getAnimationClass()} ${task.completed ? 'completed' : ''}`}
                    style={{
                      borderLeftColor: colors.border.includes('red') ? '#dc2626' :
                                      colors.border.includes('orange') ? '#ea580c' :
                                      colors.border.includes('yellow') ? '#ca8a04' : '#2563eb'
                    }}
                  >
                    <div className="task-card-content">
                      <div className="task-main">
                        <div className="task-checkbox-wrapper">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleComplete(task.id, task.completed)}
                            className="task-checkbox"
                          />
                          {task.completed && (
                            <svg className="task-checkmark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        
                        <div className="task-details">
                          {editingTask === task.id ? (
                            /* Edit Mode */
                            <div className="edit-task-form">
                              <div className="form-group">
                                <label className="form-label">Task Title</label>
                                <input
                                  type="text"
                                  value={editTitle}
                                  onChange={(e) => setEditTitle(e.target.value)}
                                  className="form-input"
                                  placeholder="Enter task title..."
                                />
                              </div>

                              <div className="form-group">
                                <label className="form-label">Description (Optional)</label>
                                <textarea
                                  value={editDescription}
                                  onChange={(e) => setEditDescription(e.target.value)}
                                  className="form-textarea"
                                  placeholder="Add description..."
                                  rows={2}
                                />
                              </div>

                              <div className="form-group">
                                <label className="form-label">Priority Level</label>
                                <div className="priority-grid">
                                  {Object.entries(PRIORITY_LABELS).map(([key, label]) => {
                                    const priorityColors = PRIORITY_COLORS[key as Priority];
                                    return (
                                      <button
                                        key={key}
                                        onClick={() => setEditPriority(key as Priority)}
                                        className={`priority-button ${editPriority === key ? 'active' : ''}`}
                                        style={editPriority === key ? {
                                          borderColor: priorityColors.border.includes('red') ? '#dc2626' : 
                                                      priorityColors.border.includes('orange') ? '#ea580c' :
                                                      priorityColors.border.includes('yellow') ? '#ca8a04' : '#2563eb',
                                          backgroundColor: priorityColors.bg.includes('red') ? '#fef2f2' :
                                                         priorityColors.bg.includes('orange') ? '#fff7ed' :
                                                         priorityColors.bg.includes('yellow') ? '#fefce8' : '#eff6ff',
                                          color: priorityColors.text.includes('red') ? '#991b1b' :
                                                priorityColors.text.includes('orange') ? '#9a3412' :
                                                priorityColors.text.includes('yellow') ? '#a16207' : '#1e40af'
                                        } : {}}
                                      >
                                        <div className="priority-content">
                                          <div 
                                            className="priority-dot" 
                                            style={{
                                              backgroundColor: priorityColors.badge.includes('red') ? '#dc2626' :
                                                             priorityColors.badge.includes('orange') ? '#ea580c' :
                                                             priorityColors.badge.includes('yellow') ? '#ca8a04' : '#2563eb'
                                            }}
                                          ></div>
                                          <span>{label}</span>
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="edit-actions">
                                <button
                                  onClick={() => handleSaveTaskEdit(task.id)}
                                  disabled={isUpdatingTask || !editTitle.trim()}
                                  className="edit-save-btn"
                                >
                                  {isUpdatingTask ? (
                                    <div className="loading-content-form">
                                      <div className="loading-spinner-form"></div>
                                      <span>Saving...</span>
                                    </div>
                                  ) : (
                                    <>
                                      <svg className="edit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                      </svg>
                                      Save
                                    </>
                                  )}
                                </button>
                                <button
                                  onClick={handleCancelTaskEdit}
                                  className="edit-cancel-btn"
                                >
                                  <svg className="edit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            /* View Mode */
                            <>
                              <div className="task-header">
                                <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
                                  {task.title}
                                </h3>
                                <span 
                                  className="task-priority"
                                  style={{
                                    backgroundColor: colors.badge.includes('red') ? '#dc2626' :
                                                   colors.badge.includes('orange') ? '#ea580c' :
                                                   colors.badge.includes('yellow') ? '#ca8a04' : '#2563eb'
                                  }}
                                >
                                  {PRIORITY_LABELS[task.priority]}
                                </span>
                              </div>
                              
                              {task.description && (
                                <p className={`task-description ${task.completed ? 'completed' : ''}`}>
                                  {task.description}
                                </p>
                              )}
                            </>
                          )}
                          
                          <div className="task-meta">
                            <span className="task-date">
                              <svg className="task-date-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>Created {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </span>
                            
                            {task.comments && task.comments.length > 0 && (
                              <button
                                onClick={() => setShowComments(showComments === task.id ? null : task.id)}
                                className="task-comments-button"
                              >
                                <svg className="task-comments-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span>{task.comments.length} comment{task.comments.length !== 1 ? 's' : ''}</span>
                              </button>
                            )}
                          </div>

                          {/* Comments Section */}
                          {showComments === task.id && (
                            <div className="comments-section">
                              <div className="comments-list">
                                {task.comments?.map((comment) => (
                                  <div key={comment.id} className="comment-item">
                                    {editingComment === comment.id ? (
                                      /* Edit Comment Mode */
                                      <div className="edit-comment-form">
                                        <div className="comment-header">
                                          <span className="comment-author">{comment.userName}</span>
                                          <div className="comment-edit-actions">
                                            <button
                                              onClick={() => handleSaveCommentEdit(task.id, comment.id)}
                                              className="comment-edit-save"
                                              disabled={!editCommentText.trim()}
                                            >
                                              <svg className="comment-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                              </svg>
                                            </button>
                                            <button
                                              onClick={handleCancelCommentEdit}
                                              className="comment-edit-cancel"
                                            >
                                              <svg className="comment-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                              </svg>
                                            </button>
                                          </div>
                                        </div>
                                        <textarea
                                          value={editCommentText}
                                          onChange={(e) => setEditCommentText(e.target.value)}
                                          className="comment-edit-input"
                                          rows={2}
                                          autoFocus
                                        />
                                      </div>
                                    ) : (
                                      /* View Comment Mode */
                                      <>
                                        <div className="comment-header">
                                          <span className="comment-author">{comment.userName}</span>
                                          <div className="comment-meta">
                                            <span className="comment-date">
                                              {new Date(comment.createdAt).toLocaleDateString()}
                                              {comment.updatedAt && ' (edited)'}
                                            </span>
                                            {comment.userId === user?.uid && (
                                              <div className="comment-actions">
                                                <button
                                                  onClick={() => handleEditComment(comment)}
                                                  className="comment-edit-btn"
                                                  title="Edit comment"
                                                >
                                                  <svg className="comment-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                  </svg>
                                                </button>
                                                <button
                                                  onClick={() => handleDeleteComment(task.id, comment.id)}
                                                  className="comment-delete-btn"
                                                  title="Delete comment"
                                                >
                                                  <svg className="comment-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                  </svg>
                                                </button>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <p className="comment-text">{comment.text}</p>
                                      </>
                                    )}
                                  </div>
                                ))}
                              </div>
                              <div className="comment-form">
                                <input
                                  type="text"
                                  value={newComment}
                                  onChange={(e) => setNewComment(e.target.value)}
                                  placeholder="Add a comment..."
                                  className="comment-input"
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                      handleAddComment(task.id);
                                    }
                                  }}
                                />
                                <button
                                  onClick={() => handleAddComment(task.id)}
                                  disabled={!newComment.trim()}
                                  className="comment-submit"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="task-actions">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="task-action-button edit"
                          title="Edit task"
                        >
                          <svg className="task-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setShowComments(showComments === task.id ? null : task.id)}
                          className="task-action-button comment"
                          title="Toggle comments"
                        >
                          <svg className="task-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="task-action-button delete"
                          title="Delete task"
                        >
                          <svg className="task-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {tasks.length > 0 && (
          <div className="footer-stats">
            <div className="footer-content">
              <span className="footer-label">
                Productivity Score: 
              </span>
              <div className="footer-progress">
                <div className="progress-track">
                  <div 
                    className="progress-bar"
                    style={{'--progress-width': `${Math.round((stats.completed / stats.total) * 100)}%`} as React.CSSProperties}
                  ></div>
                </div>
                <span className="footer-percentage">
                  {Math.round((stats.completed / stats.total) * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default function TodoPage() {
  return (
    <AuthProvider>
      <TodoApp />
    </AuthProvider>
  );
}
