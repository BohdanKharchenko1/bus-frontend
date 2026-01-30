import Navbar from './Navbar.tsx';
import Footer from './Footer.tsx';

export type LegalSection = {
  title: string;
  body: string[];
};

export type LegalContact = {
  title: string;
  company?: string;
  address?: string[];
  phoneLabel?: string;
  phone?: string;
  emailLabel?: string;
  email?: string;
};

type LegalPageProps = {
  title: string;
  intro?: string;
  lastUpdated?: string;
  sections: LegalSection[];
  contact?: LegalContact;
};

const LegalPage = ({ title, intro, lastUpdated, sections, contact }: LegalPageProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:py-12">
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{title}</h1>
          {intro && <p className="mt-3 text-base text-slate-600">{intro}</p>}
          {lastUpdated && <p className="mt-3 text-sm text-slate-500">{lastUpdated}</p>}

          <div className="mt-8 space-y-6">
            {sections.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                  {section.title}
                </h2>
                {section.body.map((paragraph, index) => (
                  <p key={index} className="text-sm text-slate-600 sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {contact && (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                {contact.title}
              </h2>
              <div className="mt-3 space-y-1 text-sm text-slate-600 sm:text-base">
                {contact.company && <div>{contact.company}</div>}
                {contact.address?.map((line) => (
                  <div key={line}>{line}</div>
                ))}
                {contact.phone && (
                  <div>
                    {contact.phoneLabel ? `${contact.phoneLabel}: ` : ''}
                    {contact.phone}
                  </div>
                )}
                {contact.email && (
                  <div>
                    {contact.emailLabel ? `${contact.emailLabel}: ` : ''}
                    {contact.email}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPage;
