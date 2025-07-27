import Image from "next/image";
import { BalanceToggleClient } from "./BalanceToggleClient";
import { API_BASE_URL } from "@/constants/envs";

interface AccountCardProps {
  userId?: string;
  initialShowBalance?: boolean;
}

interface User {
  id: string;
  name: string;
  saldo: string;
  account_type: string;
  account_creation_date: string;
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  type: string;
  month: string;
  creation_date: string;
  value: string;
  transferSign?: "add" | "sub";
}

function calculateBalance(transactions: Transaction[] = []): string {
  let total = 0;
  transactions.forEach((t: Transaction) => {
    const valor = parseFloat(t.value.replace(/[^\d,]/g, "").replace(",", "."));

    if (t.type === "payment") {
      total -= valor;
    } else if (t.type === "transfer" && t.transferSign === "sub") {
      total -= valor;
    } else {
      total += valor;
    }
  });

  return `R$ ${total.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

async function getUserData(userId: string = "1"): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Falha ao carregar dados do usuário");
  }
  return res.json();
}

export async function AccountCard({
  userId = "1",
  initialShowBalance = false,
}: AccountCardProps) {
  const user = await getUserData(userId);
  const saldo = calculateBalance(user.transactions);

  return (
    <div
      className="relative bg-[#005566] text-white my-6 mx-4 rounded-2xl p-6
  md:m-4 md:rounded-lg overflow-hidden h-[80vh] md:h-[350px]"
    >
      <div className="absolute inset-0 lg:hidden z-0 pointer-events-none">
        <Image
          src="/img/Ilustração1.png"
          alt="Ilustração"
          width={200}
          height={200}
          className="absolute bottom-4 left-4 opacity-80"
        />
        <Image
          src="/img/Pixels.png"
          alt="Pixels"
          width={150}
          height={150}
          className="absolute bottom-0 right-0 opacity-30"
        />
        <Image
          src="/img/Pixels1.png"
          alt="Pixels Top"
          width={150}
          height={150}
          className="absolute top-0 left-0 opacity-30"
        />
      </div>

      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[180px] h-[180px]" />
        <div className="absolute top-1/2 -translate-y-1/2 left-4 w-[260px] h-[260px]" />
        <div className="absolute bottom-0 right-0 w-[200px] h-[200px]" />
      </div>

      <div
        className="relative z-10 flex flex-col items-center justify-center text-center md:flex-row md:items-start md:justify-between md:text-left md:gap-4"
      >
        <div className="mb-6 md:mb-0">
          <h2 className="text-xl font-normal py-2">
            Olá, {user.name.split(" ")[0]}! :)
          </h2>
          <p className="text-sm mt-1">
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="mt-8 md:mt-20 md:mr-10 md:text-right space-y-2">
          <BalanceToggleClient
            initialShowBalance={initialShowBalance}
            saldo={saldo}
          />

        </div>
      </div>
    </div>
  );
}
