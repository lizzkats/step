import 'sym/configuration/environment'
import GoogleStrategy from 'passport-google-oauth2'
import { getUserByOAuthID } from '../../dataServices/database/queries'
import { newUser } from '../../dataServices/database/commands'

if ( !process.env.GOOGLE_CLIENT_ID || !process.env.CLIENT_SECRET ) {
  throw new Error( 'Make sure you have GOOGLE_CLIENT_ID and CLIENT_SECRET in your .env file' )
}

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  passReqToCallback: true
}

const handleResponse = ( request, accessToken, refresh_token, profile, done ) => {
  const { id: oauth_ID, email, name: { givenName: display_name } } = profile
  const created_at = new Date()
  const attributes = { oauth_ID, email, display_name, created_at, refresh_token }

  return getUserByOAuthID( oauth_ID )
    .then( user => done( null, user ) )
    .catch( _ =>
      newUser( attributes )
        .then( newAuthorizedUser => done( null, newAuthorizedUser ) )
    )
}

const googlePassportStrategy = new GoogleStrategy( options, handleResponse )

export { handleResponse, googlePassportStrategy }
