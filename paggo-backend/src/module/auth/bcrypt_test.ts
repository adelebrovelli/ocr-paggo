import * as bcrypt from 'bcryptjs';

async function testHashComparison() {
  const password = 'ab'; // Senha de teste
  const hash = await bcrypt.hash(password, 10); // Hash conhecido para 'ab'

  // Comparação direta
  const isMatch = await bcrypt.compare(password, hash);
  console.log('Senha "aaa" é válida para o hash fornecido?', isMatch); // Esperado: true
}

testHashComparison();
