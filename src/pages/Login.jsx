import Header from '@/components/Header';
import HeaderButton from '@/components/HeaderButton';
import TextField from '@/components/ui/TextField';
import { checkEmail } from '@/services/member';
import { useToast } from '@/utils/toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { addToast } = useToast();

  async function handleSend() {
    if (email) {
      const res = await checkEmail(email);
      if (res.ok) {
        if (res.id) {
          sessionStorage.setItem('name', res.userName);
          navigate('/home');
        } else {
          addToast('Not registered user.');
        }
      }
    }
  }

  return (
    <>
      <Header rightArea={<HeaderButton onClick={() => navigate('/signup')}>Sign up</HeaderButton>} />
      <main className="flex h-full grow flex-col overflow-y-auto py-[60px]">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="ml-[120px] mr-8">
            <div className="">
              <p className="text-2xl text-welcome-foreground">Welcome Newbie!!</p>
              <p className="text-2xl text-welcome-foreground">
                MyTodo makes it easy to stay organized and manage your life.
              </p>
            </div>
            <p className="mt-6 text-[48px] font-bold text-welcome-foreground">What is your email?</p>
            <div className="mt-4 max-w-[680px]">
              <TextField
                type="email"
                placeholder="Input your email"
                value={email}
                onChange={setEmail}
                onSend={handleSend}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
