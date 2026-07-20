import { RefundRuleFactory } from "./refund_rule_factory";

describe("RefundRuleFactory", () => {

 it("deve retornar FullRefund quando a reserva for cancelada com mais de 7 dias de antecedência", () => {
    const refundRule = RefundRuleFactory.getRefundRule(10);
    const totalRefund = refundRule.calculateRefund(10);
    expect(totalRefund).toBe(0);

    expect(refundRule.constructor.name).toBe("FullRefund");
  });

  it("deve retornar PartialRefund quando a reserva for cancelada com 1 a 7 dias de antecedência", () => {
    const refundRule = RefundRuleFactory.getRefundRule(5);
    const totalRefund = refundRule.calculateRefund(5);
    expect(totalRefund).toBe(2.5);
    expect(refundRule.constructor.name).toBe("PartialRefund");
  });

  it("deve retornar NoRefund quando a reserva for cancelada com menos de 1 dia de antecedência", () => {
    const refundRule = RefundRuleFactory.getRefundRule(0);
    const totalRefund = refundRule.calculateRefund(0);
    expect(totalRefund).toBe(0);
    expect(refundRule.constructor.name).toBe("NoRefund");
  });

});