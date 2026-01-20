fetch('https://internxbysadik.vercel.app/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: 'Debug User',
        email: 'debug' + Date.now() + '@test.com',
        password: 'password'
    })
})
    .then(async res => {
        console.log('STATUS:', res.status);
        console.log('BODY:', await res.text());
    })
    .catch(console.error);
