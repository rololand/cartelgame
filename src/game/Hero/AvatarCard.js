import React from 'react';

const AvatarCard = (props) => {
  const url = 'https://rololand.github.io/cartelgame/db/avatars/' + props.avatar;
  return (
    <div>
      <img src={url} alt={''}/>
    </div>
  )
}

export default AvatarCard;
