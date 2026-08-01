/**
 * Utility functions for handling images
 */

// For development/testing, we'll use placeholders if real images don't exist
export const getTourImageUrl = (imagePath: string): string => {
  // Return the provided path, or fallback to a placeholder if needed
  return imagePath || 'https://via.placeholder.com/400x300';
};

// Dubai tour images (temporary placeholders)
export const DUBAI_IMAGES = {
  MOSQUE: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  SKYLINE: 'https://images.unsplash.com/photo-1546412414-e1885259563a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  WATERPARK: 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
}; 