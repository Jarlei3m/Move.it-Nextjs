import styles from '../styles/components/RankingTable.module.css';

interface userProps {
  challengesCompleted: number;
  currentExperience: number;
  image: string;
  level: number;
  name: string;
}

interface tableProps {
  usersData: userProps[];
}

export function RankingTable({ usersData }: tableProps) {
  console.log('teste:', usersData);
  return (
    <section className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th>Posição</th>
            <th>Usuário</th>
            <th>Desafios</th>
            <th>Experiência</th>
          </tr>
        </thead>

        <tbody>
          {usersData.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className={styles.userInfo}>
                  <div>
                    <img
                      src={user.image ? user.image : '../noPhoto.png'}
                      alt={user.name}
                    />
                    <span>
                      <strong>{user.name}</strong>
                      <p>
                        <img src='icons/level.svg' alt='Level' />
                        Level {user.level ? user.level : 1}
                      </p>
                    </span>
                  </div>
                </td>
                <td>
                  <span>
                    {user.challengesCompleted ? user.challengesCompleted : 0}
                  </span>{' '}
                  Completados
                </td>
                <td>
                  <span>
                    {user.currentExperience ? user.currentExperience : 0}
                  </span>{' '}
                  xp
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
