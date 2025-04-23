import './Header.scss';

const Header = () => {
  const getFormattedDate = () => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('en-US', options);
  };

  return (
    <header className='header'>
      <h1 className='header__text'>My Day</h1>
      <h2 className='header__date'>{getFormattedDate()}</h2>
    </header>
  );
};

export default Header;