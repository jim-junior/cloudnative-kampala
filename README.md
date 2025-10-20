# Cloud Native Kampala

Welcome to the official website repository for **Cloud Native Kampala**, an open community of developers, DevOps engineers, and cloud enthusiasts in **Kampala, Uganda**, proudly part of the **[Cloud Native Computing Foundation (CNCF)](https://www.cncf.io)** global community.

---

## 💡 About the Community

Cloud Native Kampala brings together individuals passionate about **Kubernetes**, **Docker**, **DevOps**, and **Cloud Native technologies**.  
We host meetups, speaker sessions, and workshops focused on learning, sharing, and building scalable, modern cloud applications.

Our community is open to everyone — from beginners to professionals — who wish to **learn, connect, and contribute** to the Cloud Native ecosystem.

> 🌐 **Community page:** [https://community.cncf.io/cloud-native-kampala/](https://community.cncf.io/cloud-native-kampala/)

---

## 🧭 Mission

To foster a vibrant and inclusive Cloud Native ecosystem in Uganda by connecting developers, sharing knowledge, and promoting open-source collaboration.

---

## ⚙️ Values

- **Collaboration:** We grow together through open discussions and teamwork.  
- **Innovation:** We experiment, learn, and adapt to emerging cloud technologies.  
- **Community:** We believe in inclusivity and knowledge sharing.  
- **Open Source:** We encourage contribution and transparency in everything we build.  

---

## 🧑‍💻 About this Repository

This repository contains the **source code for the Cloud Native Kampala website**, built using **Next.js** and **TypeScript**.  
The website serves as the public face of the community, providing information about:
- Upcoming and past events
- Our mission and activities
- Speaker sessions and opportunities to contribute
- Links to join the community and engage online

---

## 🧱 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** Vercel
- **Automation:** GitHub App for handling speaker submissions via Issues API

---

## 🚀 Features

- 🏠 Homepage with hero section and join links  
- 🙋‍♂️ “Become a Speaker” page that integrates with GitHub Issues to submit talk proposals  
- 💬 About page with mission, values, team, and CNCF affiliation  
- 🌙 Responsive and accessible design for all screen sizes  

---

## 🤝 Contributing

We welcome contributions from the community!  
You can help by:
- Improving the website content or UI  
- Fixing bugs or adding features  
- Writing documentation  
- Proposing speaker sessions  

### Steps to Contribute

1. **Fork** this repository.  
2. **Clone** your fork:
   ```bash
   git clone https://github.com/<your-username>/cloudnative-kampala.git
    ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Create a `.env.local` file:**

   ```bash
   cp .env.example .env.local
   ```

5. **Run the development server:**

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

7. When ready, open a **Pull Request** with your changes.

---

## 🔒 Environment Variables

| Variable                  | Description                                      |
| ------------------------- | ------------------------------------------------ |
| `GITHUB_APP_ID`           | ID of your GitHub App                            |
| `GITHUB_INSTALLATION_ID`  | GitHub installation ID                           |
| `GITHUB_PRIVATE_KEY_PATH` | Path to your `.pem` private key                  |
| `GITHUB_REPO_OWNER`       | The repository owner (e.g. `open-ug`)            |
| `GITHUB_REPO_NAME`        | The repository name (e.g. `cloudnative-kampala`) |
| `GITHUB_ISSUE_LABELS`     | Default labels for new speaker issues            |
| `GITHUB_ASSIGNEES`        | Default assignees for new speaker issues         |

See our [GitHub App setup guide](docs/github-app-setup.md) for details.

---

## 📢 Become a Speaker

Are you interested in speaking at one of our meetups or sharing your cloud journey?

You can submit your talk proposal directly via our **“Become a Speaker”** page:
👉 [https://cloudnative.open.ug/become-a-speaker](https://cloudnative.open.ug/become-a-speaker)

Each submission automatically creates a **GitHub Issue** in this repository to help our organizing team track speaker requests.

---

## 📚 CNCF Affiliation

Cloud Native Kampala is an official **Cloud Native Community Group (CNCG)** under the [Cloud Native Computing Foundation](https://www.cncf.io/).
Our mission aligns with CNCF’s goal of advancing the adoption of cloud native computing worldwide.

![cncf](https://github.com/cncf/artwork/raw/main/other/cncf/horizontal/color/cncf-color.png)

---

## 💬 Join the Community

Be part of the conversation!
👉 [https://community.cncf.io/cloud-native-kampala/](https://community.cncf.io/cloud-native-kampala/)

Follow us for event updates and community news.

---

## 📄 License

This project is open source under the **MIT License**.
See the [LICENSE](LICENSE) file for details.

---

### 🌟 Built by the Community, for the Community

> “Together, we grow the Cloud Native ecosystem in Uganda and beyond.”



