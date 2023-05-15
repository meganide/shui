const signUpUser = async (req, res, next) => {
  console.log('sign up');
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Du är inne!',
    },
  });
};

const signInUser = async (req, res) => {
  console.log('sign up');
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Du är inne!',
    },
  });
};

export { signUpUser, signInUser };
