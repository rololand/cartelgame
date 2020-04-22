import React from 'react';

function AvatarCard(props) {
  const url = 'http://localhost:3000/db/avatars/' + props.avatar;
  return (
    <div>
      <img src={url} alt={''}/>
    </div>
  )
}

export default AvatarCard;
