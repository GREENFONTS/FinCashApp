using System.Security.Cryptography;

namespace Bank_Apis.Utils
{
    public static class PasswordHash
    {
        public static string HashPassword(string password)
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            byte[] hash = pbkdf2.GetBytes(20);

            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            string hashPassword = Convert.ToBase64String(hashBytes);

            Console.WriteLine(string.Format("$MYHASH$V1${0}${1}", 10000, hashPassword));


            return string.Format("$MYHASH$V1${0}${1}", 10000, hashPassword); ;
            ;
        }

        public static bool IsHashSupported(string hashString)
        {
            return hashString.Contains("$MYHASH$V1$");
        }

        public static bool VerifyHash(string hashedPassword, string password)
        {

            if (!IsHashSupported(hashedPassword))
            {
                return false;
            }
            var splittedHashString = hashedPassword.Replace("$MYHASH$V1$", "").Split('$');
            var iterations = int.Parse(splittedHashString[0]);
            var base64Hash = splittedHashString[1];

            byte[] HashBytes = Convert.FromBase64String(base64Hash);

            byte[] salt = new byte[16];
            Array.Copy(HashBytes, 0, salt, 0, 16);



            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            var hash = pbkdf2.GetBytes(20);

            for (int i = 0; i < 20; i++)
            {
                if (HashBytes[i + 16] != hash[i])
                {
                    return false;
                }

            }
            return true;
        }
    }
}
