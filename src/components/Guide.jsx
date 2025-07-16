import { Link } from 'react-router-dom'

const Guide = () => {
  return (
    <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical px-5 pb-10">
      <li>
        <div className="timeline-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="timeline-start !mb-10 md:text-end">
          <Link to={'/profile'} className="block underline underline-offset-[3px] font-medium text-2xl pb-2">Register/Update your profile </Link>
          If you are new to Eazy Connect, please register to create your profile.
          <br />
          Update your profile with your skills, interests, and a brief bio to help others know you better. 
          <br />
          This helps in making meaningful connections.
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div className="timeline-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="timeline-end mb-10">
          <Link to={'/feed'} className="block underline underline-offset-[3px] font-medium text-2xl pb-2">Explore</Link>
          Browse through the recommended profiles of other users to find potential connections.
          <br />
          If you find someone interesting, you can send them a connection request/click on interested.
          <br />
          Else you can skip/Ignore to the next profile.
          <br />
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div className="timeline-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="timeline-start !mb-10 md:text-end">
          <Link to={'/requests'} className="block underline underline-offset-[3px] font-medium text-2xl pb-2">Connect</Link>
          If you receive a connection request, you can either accept or reject it.
          <br />
          If you accept, the user will be added to your connections list.
          <br />
          If you reject, user will not be able to connect with you.
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div className="timeline-middle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="timeline-end mb-10">
          <Link to={'/connections'} className="block underline underline-offset-[3px] font-medium text-2xl pb-2">Chat</Link>
          Once you have connected with someone, you can chat with them.
          <br />
          You can send messages, share ideas, and vibe.
          <br />
          You can also view your chat history with them.
        </div>
        <hr />
      </li>
    </ul>
  )
}

export default Guide