const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const post_id = document.querySelector('#pID').value.trim();
    const text = document.querySelector('#commentSection').value.trim();
  
    if (post_id && text) {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ post_id, text }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  };