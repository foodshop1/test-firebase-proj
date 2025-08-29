import { useEffect, useState } from 'react';
import { get_comments, testFirebaseConnection, addTestComment } from './firebase';
import CommentCard from './commentCard';

function App() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      setLoading(true);
      console.log('Fetching comments from Firebase...');

      // Test connection first
      const connectionTest = await testFirebaseConnection();
      if (!connectionTest) {
        throw new Error('Firebase connection failed');
      }

      const commentsData = await get_comments();
      console.log('Comments fetched:', commentsData);
      setComments(commentsData);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTestComment = async () => {
    try {
      await addTestComment();
      // Refresh the comments list
      await fetchComments();
    } catch (err) {
      console.error('Error adding test comment:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Comments ({comments.length})</h2>
      <button
        onClick={handleAddTestComment}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Add Test Comment
      </button>
      {comments.length === 0 ? (
        <p>No comments found. Click "Add Test Comment" to create one!</p>
      ) : (
        comments.map((comment) => <CommentCard key={comment.id} text={comment.text} />)
      )}
    </div>
  );
}

export default App;
