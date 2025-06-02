import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import userRepository from '../repositories/userRepository.js'

const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID

const GITHUB_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token"
const GITHUB_USER_API = "https://api.github.com/user"
const GITHUB_USER_EMAILS_API = "https://api.github.com/user/emails"

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await userRepository.findByEmail(email)

  if (!user) {
    return res.status(401).json({ error: 'Invalid email' })
  }

  const validatePassword = await bcrypt.compare(password, user.password)

  if (!validatePassword) {
    return res.status(401).json({ message: 'Invalid password' })
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

  const { id, email: userEmail, name: userName } = user

  res.status(200).json({
    token,
    user: {
      id,
      name: userName,
      email: userEmail,
    },
  })
}

const googleLogin = async (req, res) => {

  const redirectUri = encodeURIComponent("http://localhost:3000/api/oauth/google/callback")
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
  ].map(encodeURIComponent).join(" ")

  const state = "some_state"

  const consentScreenUrl = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${redirectUri}` +
    `&access_type=offline` +
    `&response_type=code` +
    `&state=${state}` +
    `&scope=${scopes}`

  res.redirect(consentScreenUrl)
};

const googleCallback = async (req, res) => {
  const { code } = req.query

  const tokenRequestData = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: "http://localhost:3000/api/oauth/google/callback",
    grant_type: "authorization_code",
  }

  const tokenResponse = await fetch(process.env.GOOGLE_ACCESS_TOKEN_URL, {
    method: "POST",
    body: JSON.stringify(tokenRequestData),
  })

  const tokenData = await tokenResponse.json()
  const { id_token, access_token } = tokenData

  const userInfoResponse = await fetch(`${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`)
  const userInfo = await userInfoResponse.json()

  const { email, name } = userInfo
  let user = await userRepository.findByEmail(email)

  if (!user) {
    user = await userRepository.create({ name, email, googleToken: access_token });
  } else {
    await userRepository.updateGoogleToken(user.id, access_token)
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

  const frontendRedirect = `http://localhost:5173/oauth-success` +
    `?token=${token}` +
    `&name=${encodeURIComponent(user.name)}` +
    `&email=${encodeURIComponent(user.email)}`

  res.redirect(frontendRedirect)
}

const githubLogin = async (req, res) => {
  const GITHUB_OAUTH_URL = "https://github.com/login/oauth/authorize"
  const redirectUri = "http://localhost:3000/api/oauth/github/callback"

  const url = `${GITHUB_OAUTH_URL}?scope=user:email` +
    `&client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&redirect_uri=${redirectUri}`

  res.redirect(url)
}

const githubCallback = async (req, res) => {
  const { code } = req.query

  const tokenRequestData = new URLSearchParams({
    code,
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
  });

  const tokenResponse = await fetch(GITHUB_ACCESS_TOKEN_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: tokenRequestData,
  })

  const { access_token } = await tokenResponse.json()

  const userInfoResponse = await fetch(`${GITHUB_USER_API}`, {
    headers: {
      Authorization: 'token ' + access_token
    }
  })

  const userInfo = await userInfoResponse.json()

  const name = userInfo.name
  let email = userInfo.email

  if (!email) {
    email = await fetchPrimaryEmail(access_token)
  }

  let user = await userRepository.findByEmail(email)

  if (!user) {
    user = await userRepository.create({ name, email, githubToken: access_token });
  } else {
    await userRepository.updateGithubToken(user.id, access_token)
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

  const frontendRedirect = `http://localhost:5173/oauth-success` +
    `?token=${token}` +
    `&name=${encodeURIComponent(user.name)}` +
    `&email=${encodeURIComponent(user.email)}`

  res.redirect(frontendRedirect)
}


const register = async (req, res) => {
  const { name, email, password } = req.body

  const existingUser = await userRepository.findByEmail(email)

  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await userRepository.create({
    name,
    email,
    password: hashedPassword,
  })

  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    },
  })
}

const fetchPrimaryEmail = async (token) => {
  const response = await fetch(GITHUB_USER_EMAILS_API, {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/json",
    },
  })

  const emails = await response.json()
  if (!emails.length) throw new Error("No emails from GitHub")

  return emails[0].email
}


export default {
  login,
  register,
  googleLogin,
  googleCallback,
  githubLogin,
  githubCallback
}