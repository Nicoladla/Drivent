import { prisma } from "@/config";
import { Payments } from "@/protocols";

async function postPayments(payments: Payments) {
  await prisma.payment.create({
    data: {
      ticketId: payments.ticketId,
      value: payments.cardData.cvv,
      cardIssuer: payments.cardData.issuer,
      cardLastDigits: payments.cardData.number.slice(-4),
    },
  });
}

const paymentRepository = {
  postPayments,
};

export default paymentRepository;
