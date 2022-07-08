function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Philippe',
  lastName: 'Charrière'
};



function MySubTitle() {
  return <h2>by {formatName(user)}</h2>;
}

//const container = document.getElementById('root');
//const root = ReactDOM.createRoot(container);
//root.render(<MyApp />);
