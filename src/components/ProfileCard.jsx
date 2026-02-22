export default function ProfileCard({ name, role, quote }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

  return (
    <article className="profile-card">
      <div className="avatar">{initials}</div>
      <h4>{name}</h4>
      <p className="role">{role}</p>
      <p className="quote">“{quote}”</p>
    </article>
  )
}
