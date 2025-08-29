import { motion } from 'motion/react';

function CommentCard({ text }) {
  if (!text) {
    return null; // Don't render if no text
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: '16px',
        margin: '8px 0',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.5' }}>{text}</p>
    </motion.div>
  );
}

export default CommentCard;
