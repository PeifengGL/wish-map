const VolunteerApplyToJotform = async (formData: FormData) => {
  const url =
    'https://api.jotform.com/form/220411559742049/submissions?apikey=c5c6e469d80eea04a6975f5a3fb27b54';

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  }).then(res => console.log('jotform', res));
  return response;
};

const WishApplyToJotform = async (formData: FormData) => {
  const url =
    'https://api.jotform.com/form/220411559742049/submissions?apikey=c5c6e469d80eea04a6975f5a3fb27b54';

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  }).then(res => console.log('jotform', res));
  return response;
};

export { VolunteerApplyToJotform, WishApplyToJotform };
