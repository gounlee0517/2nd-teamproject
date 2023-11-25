import React, {useState} from 'react';

function Feelings() {
  const [mood, setMood] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const moodEmojis = {
    '기분 좋음': '(❁´◡`❁)',
    '우울하거나 슬픔': '(T_T)',
    '그냥 쏘쏘': '(⊙_⊙;)',
    '최고의 하루를 보냈어': '(☞ﾟヮﾟ)☞╰(*°▽°*)╯☜(ﾟヮﾟ☜)'
  };

  const handleMood = (value) => {
    if (selectedMood === value) {
      setSelectedMood(null);
    } else {
      setSelectedMood(value);
      setMood(moodEmojis[value]);
    }
  };
  return (
    <div>
      <div>오늘의 기분</div>
      <div>
        <p onClick={() => handleMood('기분 좋음')}>
          {selectedMood === '기분 좋음' ? moodEmojis['기분 좋음'] : '기분 좋음'}
        </p>
        <p onClick={() => handleMood('우울하거나 슬픔')}>
          {selectedMood === '우울하거나 슬픔' ? moodEmojis['우울하거나 슬픔'] : '우울하거나 슬픔'}
        </p>
        <p onClick={() => handleMood('그냥 쏘쏘')}>
          {selectedMood === '그냥 쏘쏘' ? moodEmojis['그냥 쏘쏘'] : '그냥 쏘쏘'}
        </p>
        <p onClick={() => handleMood('최고의 하루를 보냈어')}>
          {selectedMood === '최고의 하루를 보냈어' ? moodEmojis['최고의 하루를 보냈어'] : '최고의 하루를 보냈어'}
        </p>
      </div>
    </div>
  );
}

export default Feelings;
