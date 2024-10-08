import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/Header';
import Button from '@/components/ui/Button';
import TextField from '@/components/ui/TextField';
import { checkEmail, registerMember } from '@/services/member';
import { CREATE_MEMBER_SUCCESS_MESSAGE } from '@/utils/message';
import { useToast } from '@/utils/toast';

const initInput = {
  email: '',
  userName: '',
};

/** @type {{ valid: boolean | null; message: string }} */
const initMsg = {
  valid: null,
  message: '',
};

export default function SignUp() {
  const [input, setInput] = useState({ ...initInput });
  const [msg, setMsg] = useState({ ...initMsg });
  const [usernameValid, setUsernameValid] = useState(true);
  const navigate = useNavigate();
  const { addToast } = useToast();

  /** @param {string} v  */
  function handleEmailChange(v) {
    setInput((i) => ({ ...i, email: v }));
    setMsg({ ...initMsg });
  }

  /**
   * @param {string} v
   * @param {boolean} valid
   */
  function handleUserNameChange(v, valid) {
    setInput((i) => ({ ...i, userName: v }));
    setUsernameValid(valid);
  }

  async function handleEmailSend() {
    if (input.email) {
      const ret = await checkEmail(input.email);
      if (ret.ok) {
        if (ret.exists) {
          // error
          setMsg({ valid: false, message: 'This email already exists.' });
        } else {
          // ok
          setMsg({ valid: true, message: 'This email is available.' });
        }
      }
    }
  }

  async function handleConfirmClick() {
    if (input.email && input.userName && msg.valid && usernameValid) {
      const res = await registerMember(input.email, input.userName);
      if (res.ok) {
        addToast(CREATE_MEMBER_SUCCESS_MESSAGE);
        navigate('/');
      }
    }
  }

  return (
    <>
      <Header />
      <main className="h-full grow overflow-auto">
        <div className="mx-auto w-full max-w-[400px] py-[60px]">
          <h1 className="text-5xl font-bold">Sign Up</h1>
          <div className="mt-[32px] flex flex-col gap-2.5">
            <label>
              <span className="text-xs">E-mail</span>
              <TextField
                type="email"
                placeholder="E-mail"
                value={input.email}
                valid={msg.valid}
                message={msg.message}
                onChange={handleEmailChange}
                onSend={handleEmailSend}
              />
            </label>
            <label>
              <span className="text-xs">User Name</span>
              <TextField
                placeholder="User Name"
                showSendButton={false}
                value={input.userName}
                onChange={handleUserNameChange}
              />
            </label>
          </div>
          <div className="mt-[32px] flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setInput({ ...initInput })}>
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={!input.email || !input.userName || !msg.valid || !usernameValid}
              onClick={handleConfirmClick}
            >
              Confirm
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
