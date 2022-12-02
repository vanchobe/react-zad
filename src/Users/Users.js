import { Image } from 'react-bootstrap';
function Users({id, nameFirst, nameLast, internetEmail, personAvatar, publishedDate, company, createdDate, updatedDate}) {
  return (
    <>
  <tbody>
    <tr>
        <td><Image src={"http://apis.chromeye.com:9191" + personAvatar.url}  width={75}
    height={75}  roundedCircle /></td>
    <td>{id}</td>
      <td>{nameFirst}</td>
      <td>{nameLast}</td>
      <td>{internetEmail}</td>
      <td>{company.name}</td>
      <td>{company.department}</td>
      <td>{publishedDate}</td>
      <td>{createdDate}</td>
      <td>{updatedDate}</td>
    </tr>
  </tbody>
    </>
  );
}

export default Users;
