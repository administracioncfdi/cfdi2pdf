/**
* Receives a json and returns a pdf content object for pdfmake
* @param {Object} json result json from using parseData function
*/
var createPDFContent = function(json){

  // playground requires you to assign document definition to a variable called dd
  // Falta agregar estilos y sustituir campos por json.campo
  // Generar funcion que transforme las imagenes de una url en formato 'dataURL'

  var logo = 'data:image/png;base64,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';

  var qr = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAAEiCAYAAABdvt+2AAAACXBIWXMAAAPYAAAD2AFuR2M1AAAgAElEQVR4Ae2dCZwUxfXH3973sssdQeSSxSCiyBluEEE0IaISIoomHgh/4B+DEkDxikqSf0QFCSAGRBYU5VJRBBSjROVYDjkEiZxCYLkW9r73X2/MGvaYquqZmu6e5Vefz3x2p+v1e6++3fNmuvvVq5Ay0QgNBEAABBwkEOqgbZgGARAAAQ8BBCKcCCAAAo4TQCBy/BDAARAAAQQinAMgAAKOE0AgcvwQwAEQAAEEIpwDIAACjhNAIHL8EMABEACBcBWCe++9l/bs2aMSq/H9W7ZsCdox3n777XTkyBEj/q9fv54SEhL81lVSUkJdunTxW49pBSkpKZSammpE7aZNm2jMmDFGdAWzkjZt2tDrr78uHYIyEHEQSktLkypBp7sJ7Nq1i/bv32/EyeLiYiN6SktLXXleFRUVGRkfK7lw4YIrx2hsgAYV4dLMIEyoAgEQ8I0AApFv3LAXCICAQQIIRAZhQhUIgIBvBBCIfOOGvUAABAwSQCAyCBOqQAAEfCOAQOQbN+wFAiBgkAACkUGYUAUCIOAbAWUekY7arl27Uq9evXREXSfD+TXLly834tf27dvpo48+kuqKi4ujcePGSWVMd44cOZJOnz4tVXv06FFavHixVEa3c+/evbRy5Uql+MSJE5UyW7dupXXr1knl4uPjjSUOhoWF0dSpU6X2uHPUqFGUlJSklNMRGD9+PEVEROiIuk6GExVPnjzpv19coVHWOnTowBUcpS9xQslUuLpv2bJl0rGVj11nELNmzVLqqlevno4q22VExrTSd2Zx7tw5pW9vvfWWUld4eLhSDwtMnz5dqeuyyy7T0qUjJL5MlPaYw4EDB5Tq1qxZo6UrKytLqcutAu3bt1eOkWOIquHSTJxVaCAAAs4SQCBylj+sgwAICAIIRDgNQAAEHCeAQOT4IYADIAACCEQ4B0AABBwngEDk+CGAAyAAAghEOAdAAAQcJ2AkoVFnFNnvvk/n5i3QETUmE92yOdV/4S/G9KkUcYJbq1atpGIs8+2330pluLNu3bpUp04dqVxhYSEdOnRIKqPb+f3332uJfvfdd5SYmCiVPXHihLS/vFOHw6lTp8rF/f7LSZt5eXlSPaYqWUqNWOwszcykk795kEwVpdMxHxISQj95+QUKv6KJjrjfMrYFotM7d1Hk1zv9dtiKgoz0dKpvZQc/ZYcNG0b8kjX+YDVo0EAm4umbMmUKPfPMM1I5zgpv27atVMZ0Z6dOnYyo5A9V69atjejSVXLHHXfQ5s2bdcXdIyeqRpZt3UZhNntUlpNjm0VcmtmGGoZAAAS8EUAg8kYG20EABGwjgEBkG2oYAgEQ8EYAgcgbGWwHARCwjQACkW2oYQgEQMAbAQQib2SwHQRAwDYCCES2oYYhEAABbwQQiLyRwXYQAAHbCNiW0GjbiFxuiNeNnzZtmtLLTJFN+/DDD0vlzp49K+2vCZ3du3enIUOGSIdSUlKiZMUKOLNa1US1R3rkkUdUYsqsd6UCCFQggEBUAUfg38TExGh9aDir+qWXXgq8Qy63cO211yp5HT9+nBo3bmxkJKKUr9KeEUNQUoEALs0q4MAbEAABJwggEDlBHTZBAAQqEEAgqoADb0AABJwggEDkBHXYBAEQqEAAgagCDrwBARBwggACkRPUYRMEQKACAQSiCjjwBgRAwAkCyCOymXqRqLa3adMmLavdunWTyuXm5pJYIlkq40Qnl7lNSUkxYrpFixZG9LCSdu3aUXx8vFQfJzT+85//lMpwZ8eOHSkqKkopBwE9AghEepyMSWVkZFCPHj2U+rhUrOoDsXv3bttLxSodFwJ9+/alJUuW6IjaKjNnzhzq3Lmz1OaOHTvouuuuk8pw54EDB6h58+ZKOQjoEcClmR4nSIEACASQAAJRAOFCNQiAgB4BBCI9TpACARAIIAEEogDChWoQAAE9AghEepwgBQIgEEACCEQBhAvVIAACegQQiPQ4QQoEQCCABBCIAggXqkEABPQI2JbQWKv7z+jbf/1LzytDUpddc40hTXpq1q9fT/PmzZMKFxQUSPvLO1euXEkHDx4sf1vtXy47u3Dhwmr7Lt746KOP0smTJy/eVOX/q666iiZPnlxle+UNI0eOJM7oljXOHL/rrrtkIhQeHk6vv/66VMZ051NPPaUs8ZqYmKjFtH79+qbd86ovJCaWMn9xM50/f96rjOmOyMhIaigy5G1rZYrWoUOHMuGM9DVx4kSFFvd2L1u2TDq28rHrjGDWrFlausp1+vu3TZs2Om6VtWrVSulX7969tXQlJSUpdemMSwQiLXs6QseOHTPiE/stpoHomNSSWbNmjZZfWVlZWvrcKNS+fXvlGDmGqBouzcTZhwYCIOAsAQQiZ/nDOgiAgCCAQITTAARAwHECCESOHwI4AAIggECEcwAEQMBxAghEjh8COAACIIBAhHMABEDAcQJGEhr3799Py5cvd3wwvjigW7bVF93V7cPlRQcNGlRdV4Vt+/bto71791bYFixvGjVqRJ06dZK6GxoaqnXOcKlYLvFqoolcKUpOTpaqql27tpZfAwcOpNjYWKku3c733nuPoqOjdcVdJWcsyVKVaKST0CjIKJOagl1GxYn7dRIaxdrqOqrKnn76aSVTtyY0Dh06VDnGwsJC5fj4nBkzZoxSl25C48aNG5W6RA1wLb9EqVilLt2ExmD/bKj8R0KjIIQGAiDgfgK4R+T+YwQPQaDGE0AgqvGHGAMEAfcTQCBy/zGChyBQ4wkgENX4Q4wBgoD7CSAQuf8YwUMQqPEEEIhq/CHGAEHA/QQQiNx/jOAhCNR4AsrM6i1bttR4CME6wD179lBISIit7mdkZCjt8br3pvx65ZVXiF8mWpcuXUyo0dZx4403ksh61Ja/lAXxi+hSPvoYOwi4hAACkUsOBNwAgUuZAALRpXz0MXYQcAkBBCKXHAi4AQKXMgEEokv56GPsIOASAghELjkQcAMELmUCCESX8tHH2EHAJQQQiFxyIOAGCFzKBJQJjW6Ew+u489rwbmtnz54lXhte1iIiImj27NkyEU8fJ8KpdCmV/EfgrbfeogsXLuiK+y3XsmVLpe+lpaU0d+5cpa2rr76aunXrJpXLzc3VWq9eqiQAnaJyJK1atcqI5r59+5JYOtyILh0l2dnZlJqaqhS9/fbbqW7duko5pYCy3qULBTZs2KBVzlMM3lY5ETiUtNLT07V8mjJlilKXroA4gZU2RT1nXXVG5JwoFWvyfLC7VOyCBQuMcNdVcvjwYeU5wzzT0tJ0VUrlcGmmDNUQAAEQCDQBBKJAE4Z+EAABJQEEIiUiCIAACASaAAJRoAlDPwiAgJIAApESEQRAAAQCTQCBKNCEoR8EQEBJICjziJSjcrFAZGQkTZw4Uelhjx49lDK6Ag8++CCdOXNGKt68eXNpv+lOXnJah0PXrl2VphMSErR0KRVdJPDCCy9QUVHRRVvwbyAJKAMRV+QzcUDCw8OJ1xU30fjDLJZuNqHKqA5OVjx16pRUZ1hYGE2dOlUqY7pz/PjxplX6rc8kh8TERONMuSqkifNeBxQnBKoqWrIvqnNLx5auDCfn6jSODyq/+HORnJwsVyfNMhKdvG610OD3i5PqanqbNWuWktNf//rXmo6hRowvPj5eeixNJjRmZWUpmd19991Sf0x8RgOlg2OIquEekTxOoxcEQMAGAghENkCGCRAAATkBBCI5H/SCAAjYQACByAbIMAECICAngEAk54NeEAABGwggENkAGSZAAATkBBCI5HzQCwIgYAMBBCIbIMMECICAnIAys/r++++nm266Sarliy++oPXr10tlnOjkcrI7d+40YvqJJ54wooezTNEuDQItWrQgUWlTOdhp06YpZXTOY569MGnSJKWuxYsXk0jIlMrVqlWLxo0bJ5Xhztdee41OnDihlFMKqDIedfqff/55ZdanE5nVw4cPV/olAGnJ6HDQyayeOXOmjirIOEzARGa17hDi4uK0zkHVuRoTE6NlcsCAAUp7TZo00dLVvn17pS5kVivDMARAAATcQEB5aeYGJ+GDMwRKz2VQ8eHDVHIyncpycqgsP59Ks3M8zoRER1NIVBSFJidR2GWXUfjljSm0tmJiozPDgNUgIIBAFAQHyQ4XOegUbEmjwk2bqXDrdio+dJhKMzMtmQ4V5Tgi2rWlyGvbUWT76yjqZ12IAxYaCKgIIBCpCNXg/hJxkzHv/Q8p971VVLTnG3G3jC/3fW+lWVlU8M8vPS/WEhITQ1E9ulHMwBspZtBABCXf0db4PRGIavwhrjRAsbBh/sfrKXveAirYvIVIvA9UK8vLo/y1H3teF55+jmJv+yXF3T2cwps1DZRJ6A1SAghEQXrgrLpdVlxMectXUtac16j4wEGru/stXypWmuXgl70glWJ/+XNKGDeGwq9o4rdeKKgZBJDQWDOOo3QUBV98Radu+gVlTJjsSBCq4FxJCeUuW0np/QbQhWenipvguRW68ebSJGDbLyKxxDDt3r3bVspcy7hNmzZGbOr4ni+eKqnsKUtmGvH2ByUlp0/ThaeepbwPVhvU+l9VoUm1KFzUug5vdgWFN21KYeLJGd+cDo2Pp5C4WAoRCXZleeJJW34elV3IpJLj/6biI0fEk7ijVLR7D2W/Nt/jW9IzT1J0/37/VYz/fCIgEn+0PmNcmlZ1nnIpZt1z3idnK+1kWyASa2lT27ZtK5kP7NuFCxeSSDI0YkRVU5iNjBw5UnnwcnPt+QWQ//kGynh4ApVq1h7WgRQqao5Hdf8ZRXXuSFGdOlJ4yxbijnSIzq5VZcS9qaL931FhWhrlLHmHCsTTusRHf+9JCagqjC06BPiLUOcztnr1akpNTZWqPCK+MJqKLxe7mm2ByK4BXfJ2xKVP5l9fpKzZc/1+CsYsQ+LiKGZAf4r5xS0U3b0bUXiYGcRiFY+I1q08r7i77vTkKZV8f+yH4GbGArQEEQEEoiA6WCpXywoK6NzYhz1PqVSyqn5OUoy//zcUN2wohcTGqMT97ueA5/mF5bcmKAhGAghEwXjUqvGZkw/P3T/qh0fy1fTrbgpvcjkl/G6s5xcQ3+NBAwE7COBMs4NygG3w9Iszw++lol2+Pwzgm8wJDz1A8aMexH2aAB8vqK9KAIGoKpOg2lImnkaefXC0X0GIp2Ik//l5z1OvoBo8nK0xBBCIgvlQise1Gb+fQJwn5FMTq84m/u8YShgzikjcPEYDAacIIBA5Rd6A3ey58yhv1Yc+aQqtU4dqz5rueQzvkwLsBAIGCSAQGYRpp6rCHV9T5l9e8MlkWONGVHfh/IDP+eIZ/SWnTlHpmbNUKu5jkZhmQuJXmCfhMT6OQkUVQE8SJG6K+3Qca9JORgIRJ/INGTLEdVx+8pOfKH1at24djRkzRim3b98+pcxHH31EKSkpUrkJEybQfffdJ5VRdfLNaX5Mz/PHrLaIlFZU5415FNagvtVdpfKl5y9QwZdfeRITi77ZS0V7v6Wy7GzpPtzJT+Y4GIW3bCl+nXWgqC6dKOKnV3kClnLnAAps27ZNzAf2PiH48ssvN2Z9+/btUlu6hjih8dprr9UVl8o1atSIdM752267jfbs2SPVpdNpJBDVFhm3/ArGliVKV+zfv1/puirAsIJPP/1Uqev8+fNKWyqBzJdfIU7+s9p4GkbdN98QBczMHCueyJr34RrKW/EuFWzdRiSSKa02DqZc+4hf+es+9uzOU0diBt3kma3PdY18zt626sxF8ldeeeVF7wL7rylbJrP2uf61zjkfJYrjmWhGApEJR6BDj0DxdwcoR8xit9rCxNyhOm/83UgQKjl2XMwTmyemZiwVc8nyrLqilOdfVzmL3/K8wps386QVxAz5pefXk3JnCAQlAQSiIDts559+1vIlGWdG15n/KnGyoj+NC59liV9jee+uokgx3yxh3GiKEL8cuL4QZ0Z7JrqKb0gOTqVikmvpmTNUfPCQZ8Y/V38s2rHTsu+8P1cNyJw+kxJFomXsbbc68gvJH27YV00AgUjNyDUShdu2U8GGLyz7k/TUFIq42r8qBAUb/kkFadso+oa+VGvSBOk9nJDISM+NaBKBz3Np9R+Py3JFobR/fCbKgKyg/M8+Fzev9S/l+FdYxiMTKfftZZT0/DOYDmL5LHD3DkgecffxqeBd1iwxkdVii/n5zRQ79HaLe1UU55KyEVe1psSHx4mbyZ2lQajinhXf8S8zLhlb5+9zqOGG9Z5qjRy0rDSuKnlq0GDKWbjIym6QdTkBBCKXH6By9/jeUP4n68vfav3liav868HfFiaePoaKGjYmG+tM+uOT1GD9Goru08uSas4mPz/laVHm5NGA3KOy5AyEjRBAIDKCMfBKct5823J96VqPTyReWcPNjXOa6syfS8kv/MVTbN+Kr7niad2ZEb8lvneFFtwEEIiC4fiJx+J5qz6w5GlUt66eyyBLOzkozIX166142/J8t8ItW+ns8HuoNMP/tAgHh3/JmzZys/ro0aPKtbR1SXNORePGjaXiF0T+CiecmWjp6enUu3dvpSrOEVK1bJHAp9LFiWJWW8HGzVSSfkp/N5G9XOvJx/XlXSIZ0TqF6r3zJp25c4TnaZuuW4U7d9PZ3z7oyZFy0zpqGRkZtGPHDuUwevbsKRLO5QXn9u7dSydPnpTqKhY5WarzjxUcO3bMk/MmVabZyee8iWYkEC1atIgmT55swh+aNm0aPfzww1Jdu3btor59+0pldDtvvfVWrYOiWypWFbB8STrL+/Aj3eF45LiiYkQr+xLyLDmnEA5r2IDqLkml00N+ZSlps3D7DsoY/weqPeNF10zg3bJlC4l15hUjJuKk2nhR51vWpk6dSlz6WNZixDpyOufXwIEDac2aNTJVtvfh0sx25NYNFny10dJO8SPvtyTvNmFP8qV4shai+HBW9psXCciaY/3JYmU9eG8/AQQi+5lbssgrcfD0B93GRe0j212jK+5aOf5Fl/ynZy37lzVtumeFEMs7YgdHCSAQOYpfbbxwc5qlIvixw4eplQaJRMwtg4jzoKy0sqIiOve7R4j/ogUPAQQilx8rXv9Lt/Fa8zE39NMVDwq5pKce90wfseKsZz7eG6lWdoGswwSM3Kx2eAw12nzx4SPa4+PpFzzfKxCNVwjhGf/Fx4+L8h6ithA38aQnTCQ68gKLXGgtEI31Joh7XpnTXrakPmv63yh2yK0UmpxkaT8IO0MAgcgZ7tpWrdwfirn5Jm29OoJcVyjv/Q89dYYKueaMZG5Y2E8aEte+5vIdUb16GJ0pH3/fvcTVKK0kLnKJEq4QwIs2ormfAC7N3HyMRE3q4iNH9TwUK65Gde6kJyuTEjY5XeD04Ns9c7qyZs2hwq93SoMQqys5cdKzpv3Z+0ZSeo9+lD3/Dcsz7b25xTP7Y+8Y4q3b6/acRW9iCohXOu7qQCBy1/Go4E2ZqLinW++HnzL5exlS9O1+On37r+nc6HE/BJ8K3ui/4UmyF0S5klMDf06c32OixYqFHq02rmvEM/3R3E9AeWnWr18/ZRYzl6hUtZaiFOjmzZtVYvTss89ScnKyVK5EsxLgnDlz6I477pDq4sQulT2pgos658+fT0uWLLloS9V///jHP2qVpuU9y3JzqyrwsiWyYwcvPXqbuRDZhaefI74XZKrxTeMzd9wpsrwf88y090cvB9rwFs09tY2s6Mld/i7xktZWG2f353CdbS+NM6avuOIKL70/bOak23PnzklluLN169ZSWyyjk6jIcjpt6dKlVGToqWKfPn3o66+/1jErlVEGokyxgqiJ8qahoaFaH3iuE2zCHo86NjZWaTNSlKEwZa9QzArnl6wVWPigc/0e3RbZrq2uaBW5zD+/QHwJFojGpWB5pjz/OkkYO9ovE3wzPvvAQUs6+BdZyb//TVyJwErjaUSy6Qs6X4ZcblXnS47PP1nQs+K3jqwqi1tHR7mMampKuZzqLy7NVIQc7C+18IsoXPHt7G0YmS9OD1gQuthm5gsvkaeCwMUbLf4f1eF6i3sIcb7n9dFa6/thD1sJIBDZituasRDFRMiLtYU1lV8mXCxb/n/ee6s8pV/L3wf674Unn6GiPd/4bCby+ut82pcnDaO5mwACkYuPT4jmCgmcOxRWz1rhshKRD5Qx+QlbR88Fzbjcqy+rfbCjvPoIr/BhtRWmbbWUnW5VP+T9J4BA5D/DgGng0qo6jSeJWl1y58Ifp2qtO6Zj34pM0d59lPPOciu7VJD1ZQEAXuhROw2igjW8sYsAApFdpH2wE5oksoLD5XVqWC1P7bDSCr/e5eh9k+zZYoa8ZPFC2Vh8LVlrJTFUZh99gSGAQBQYrma08hSK+g2UuqxO68ie+3elzkAKFB8+TAVfbfLJRIh4EupLszJVxhf92Mc/AghE/vEL+N5hjdTLZofE6H84S0U6Rv7aH1ZUDbjzEgNWi72VqwqJsrbqR/l+/Agfzb0ElHlE/fv3p+bNm0tHwGUsuWqirHEVOlWyH++vs/xzXTHRUqdCY1OxxLKqceLa0KHqrN23335bpSog/REpKcR1mWVNp3pk+f7569YT3zR2uhV8+ZVPLpTlqZNnq1NcJklOrE5ete2DDz6g+vXrS8UaNmxIvXpZW6FEqlDRyblNOp8x9ol9c1NTBqLnn39e6S+XsVQFohMi7X/YsGFKXToCvCa3DnAdXZ06ddLS5VgguipFOYzSXO8ZwJV3LtjkjkfZfM+Gf52FJiZWdlH6/seZ/1Kpqp1lOfpZ6lX3rrpl3LhxVTdW2sJf4nYGIk6m1fmMrV69mrhcrJsaLs3cdDSq8UWn2qKVD5mpuV/VuGp5U/Hho5b3KdGYMlGdUjf8CqzOL2z7gQACkcvPhIifXiXyZ+Rz77TnpIknVSW6s/lt4FLqQ1Dx9emXrze5bcAAE4IAApHbTwMxR09V3qPkrHpiJQ+z5NRpV9wfKkeuHUD/swMvqeTrvZ6Q+Lhys/jrQgIIRC48KJVdihbLA8lamVhbioOMqvn6IVbp9bXf6rr3/lxWhoqaRmjuJYBA5N5j86NnMf37kWq6R/FB9ax0rm/kphaSaG05bKvLKl08Vq4gieZeAghE7j02P3rGFQqjRTCSteKDh2Tdnj6rGdhKhX4KhF9+ub4GMYu+4LMN+vKVJMMVKSiVxPHWZgIIRDYD99Vc/Ii7pLvqrPZhdcFCqUE/O/mxPa/qqtv4ssyf7Ojw5s10TUHOAQLKPCKTPnGhKFXjwmj8krUy8e1oqsKczI7VPi7+xi9ZU/V72zeyUwfiJ2hc0L66VvCFOkEwlC+FRG1rrtHjdIvs3NHSRN3cpb5PlOUSulaCntNsqrPPBcisJK5Wp6N8m+45qPMZ48+06nOt6me/1JGh3Hs//7Zq1Yq+/fZbpRZe9/6ll16Syn355ZfElRXd1h544AGaPXt2wNxKGPc/dO6hMdXq59nlJceOU1jjRtX288aQ6GgKa3SZR86rkE0d0X16a1vip2W5y1Zqy1cWjOraxVLQq7y/G97PmzePRowYYZsrR44cIZ2ZCWlpaXT99T4UrKs0EvnXdyVhvHWWQIx4ehZxdRuvThR88aXXvvKOiCtblv/r2F++8R5zs35mb/bsV/2qpR3V/WeOjRWG9QggEOlxcoeUuKyq9fhEr9/uuas+VPopC2TKnQ0JxN5xG4XW0itwVrRvP+UsXOy7ZcEsukd33/fHnrYQQCCyBbM5I1FdOlPsrYOrVcj3iVSzzKN79qh2X7s28pO7hNEP6pkTkzjPT57i1/pokR3aU9jljfXsQcoxAghEjqH33XCtx/5A1RYIEzf5cxXVDyOvu1b714jvHnrfk+9z6a6owQX3C7dt965MoydO/PpCcz8BBCL3H6MqHvJ68Mn/N7XaS7Sct5fKf0GIio8xgwZU0WnHBl6SOuHB+7RMcb2irFmvasl6EwpNSBD3ogZ568Z2FxFAIHLRwbDiSnSfXhT/wG+r7FJy/N+U+/ayKtsv3hA3/NcXv7Xl//BmTan2K+JpqMbKJPmfb6CM3z3id5pB/P2/IavVK22BASNVCCAQVUESPBtq/eER4oBUuWW9Mks6uZVvWEde377ybgF7z0Gobup8zyocKiP56z6hcyPHSP1X6eB+zh2Kv+9e/hctCAggEAXBQfLqovh1UXvGixTR5qcVRPiGdc5i+dLXiY8+XGGfQL2J6taV6i1/W+Qvec9v8tgWSZbZc16jsyP/h8ry9Fe49eY3ryrrpkxyb35i+w8EbEto5GV1Z8yYoeSeIK7rx4ypPmlPuXMlgXXr1imTKLkM7qBBZu4jJIlVN1Rj7N27N7Vt27aSp76/5Q9b3YXz6cyv76aib/f/qChL3OiNGXij14xifvoW3bc35a//x4/7mPyHL4kS/3cs8eWRSDeXqi45mU7nJ0wmviQz0SKvbUfx99xtQpVXHZxcmKioLhkn5giqzgc2oJPB/PHHHxMvgy1rERER9NBDD8lEtPt4bDqfw08//ZQ4wVjWGjRooCzHHCKmS/id78+lYidPnizzRbtv2rRpxNnVJtpdd91FixYtkqq69dZbafly36cPXKycs6pHjRp18aYq/8+cOZNGjx5dZbu/G0rPnKEz99xfYSVVnihbZ+4sr6o5G/vUoF+IGj/myqjyWmxxv7qD4h96kMIayGs6lxUUUM7rCylr5mxP2VivjlroCBEfxnqrVlBESisLe1UV5S/EbFFexVs7cOCAspb72rVracAA+x4MxIjUiFwLy5R7G5uV7ZxVvW3bNukuHTp0oC1btkhl5F9V0l3R6SYC/Di/3pJU4kuh8sb3W3hZaW8t/IomIkHS/y8Qvh8TfeMNnid5DTduoFpPPi4NQqViIYXs1+ZTep8BdGHqX4wFIR5nrace9zsIeeOF7YEjYNulWeCGAM3lBPgyrc6Cv1Pm83+m7HkLPJt5WWm+hxTeonm5WIW/cXMvwFUAAA9iSURBVL8eSryiRt77H1TYXt0bzv+JEpNVo3p08+Qi8ePxMBHMVL98WBf/6uIpKPxYPk8EyEAUaYu7cxg58USwOlbYZo0AApE1Xq6XDhGzoWs98RhFtr+Ozj/2JJWK+wpnHxhF9d5dShw4qmvJf/0T8WN/VfIg3wTPXfEu5YmpJBFtr6bIa68RWcuXU7iYaMulWENFIOQL/TKxOkcpV408+r2ndEfhzl1UtG8fUXFJdeaNbIvu1ZNqPfOEEV1QYj8BBCL7mdtiMeaWQRTZsQOdn/S454Y05+XUefVv1ebx8CTUOq/NojN3jhAB4783vL05WlZU5AlaqsDlbX/T26PEXLLar84kDsJowUkA94iC87hpec2XTHXmvUq158yk4u8OUMajk7yuOR9auzbVfTPV80tHS7lLhKJv6CtuyP9NWUrXJe7CDS8EEIi8gKlJm7l8SP11P1xOZU6f6TVjmW861128gKL79XH/8MWs+oRRIz2/8rjOElpwE8Bv2eA+ftre84oZ8b8ZQXxZxfdvvN0v4u38yD9LBCxP0FJUy9R2wKBgaFItSnr2aeLLT7SaQUAZiE6fPk28lK2sZYqbk6rG5SJVa4WzDl6/+/jx4yp1Wv15Ghm6+WJlCx17jVSZwVoeOS/EeTb8kjaRgJjwu7EU1bM7ZfzhMSr+13dScTs7o3v3pKQ/Pec1UdNOX1S2osUvtcvEk0ZV4+XYVel8ycnJxHlCsqbql+3rdJ8yEHHWMZeD9LdxBrNuqdjGje2rH8PrgOvYU50o/vJx4/785K3+Byspe/ZcyhLTLwLxyF133OEtW1CtCeM9+Uq6+zgt17NnT60vuXjxtDEnJ0fqLpdPtrNUrNSZAHTiHlEAoNYklXxJxzWEGm5Y75ntb/dsds5/Sv7zc9Tgo1VBFYRq0jlgx1iUv4jscAI23E8gtHYy1Xpsopg/NsZTyD5n0ZtUtP9fAXGcg19Urx4UP2I4RXXvVm3dpYAYhlLHCCAQOYY+OA1z9nbcPXd5XpwSkLf2Y8r/5FMq2rXbr9IdYfXrUWSnjp6FJHkyrreb6cFJDV6rCCAQqQih3ysBvm+TwK/RIz1P43iRx6I935BnaaPvj1HJiZPEy1xzWQ+e4MqJkyGiaH5ITDSFN2kiXiIru1lTkaHdDnWlvVK+NDoQiC6N4xzwUfKTOK6HzS80ELBKADerrRKDPAiAgHECCETGkUIhCICAVQIIRFaJQR4EQMA4AdvuER09epQ6d+6sHADLqVq7du1ozpw5KjGj/Tq+d+/enTZu3Ci127RpU2k/Oi89Av/4xz88MwpkI2/RooWs29NXIB4IcBKlqr388svUpUsXqdjJkydp8ODqF/K8eMdJkybR5aIUjKxxwqaq2RaIeCrF5s2bVf5o9fPAdAKDljJNIR3fr7vuOtv90nQfYi4mwKVUTTSeHqVznnL9eFXjoKajq1mzZsTlYv1tuDTzlyD2BwEQ8JsAApHfCKEABEDAXwIIRP4SxP4gAAJ+E0Ag8hshFIAACPhLAIHIX4LYHwRAwG8CCER+I4QCEAABfwkgEPlLEPuDAAj4TUCZR5SSkqK1NrfKE85L2MdrW7ms8Xrihw4dMuLV2bNnaceOHVJdXDpUp2SuVEkN6UxPT1eOhMutxsbGSuU4f+aMWHJb1WqLlUp4fXhZ43Xoz507R6WKWt179+4lnRLJMlum+zhXL1ibMhClpqYaGRuXiW3durURXSaVfPLJJ3TbbbcZUbl06VLil6zVq1ePTp06JRMx3vfOO+8QB1y7GpcF7tu3r9JcgwYNlDIzZsygcePGKeXsFrjlllvsNlmj7SkDUY0e/SUyuMcff5z271cvnGgKx9ChQ7UCkSl70BP8BHCPKPiPIUYAAkFPAIEo6A8hBgACwU8AgSj4jyFGAAJBTwCBKOgPIQYAAsFPAIEo+I8hRgACQU8AgSjoDyEGAALBTwCBKPiPIUYAAkFPwLY8Ik5yO3DggBFgnG1rqg0cONCYX4sXL6YpU6YYcY0T+V588UWpLs56X716tVRGt5NLhy5atEgpzlUoTWQUFxcXU6tWrZT2dGxxYuSXX36p1KUjwBnTOsmKXN5VVSJVx56uzCOPPEIrVqyQivPnYs+ePVIZ7uTyrqNHj5bKMVOdzyvrUeWoXXPNNbRy5UqpPdsCEafWczByW+PpA6b8qlu3rrHhZWRkKKeeqKY+WHGGT2IdDqGhZn5El5WVKcen639YWJiW7zr6dAIf6+EgpMNLx6aOjE7d55CQEC2fdKY18bQZnfGdPn1aeRzr1KmjHKKZs0ppBgIgAAIg4J0AApF3NugBARCwiQACkU2gYQYEQMA7AQQi72zQAwIgYBMBBCKbQMMMCICAdwIIRN7ZoAcEQMAmAghENoGGGRAAAe8ElHlEmzZtsrW6n3dXne258cYbnXXAJda58mJWVpbUG06GW7t2rVSGS7H2799fKsOd33//vbESw7yEsmq55YMHDyp90hXg0sFbt25Vivfr1484F8quxktEq0rh6lTPNOmvMhCNGTOG0tLSTNoMSl2cgIdGtGzZMiWGJUuW0IABA6Ry4eHhWrXQTZaKHTt2rNZ67lLHLXRyEFJxYHUc2HUSFi2Yloo+99xz0n4nOnFp5gR12AQBEKhAAIGoAg68AQEQcIIAApET1GETBECgAgEEogo48AYEQMAJAghETlCHTRAAgQoEEIgq4MAbEAABJwggEDlBHTZBAAQqEEAgqoADb0AABJwgoExo1HFq/Pjx9NRTT+mIuk7mvffeo+HDh9vm15kzZ7SS14qKioz5tH37dmUmLZdaNZVUN3jwYGX2NZeK1bFnkoMxoJqKOGNalYXOqnQ46JjMy8vT0sVlW2+44QapSs5ov+qqq6Qy3Mk2TTQjgYjLwJqCaWJQVnSYrH+tY5cztHNycnREjcnolJTlY2jKL50gwwHGlD1joAwr4mkbdn8udJjy8VE1ngKio0ulR7cfl2a6pCAHAiAQMAIIRAFDC8UgAAK6BBCIdElBDgRAIGAEEIgChhaKQQAEdAkgEOmSghwIgEDACCAQBQwtFIMACOgSQCDSJQU5EACBgBEwkkek492JF6dT0fSZOqLGZEqaN6Vmn6wxps9ORZwUOGTIEKnJ5ORkaX8gOmfNmkWqvKT09HQaMWKE1DwvXb1gwQKpDHd+/PHHtHDhQqWc3QK8Fr2dOUJffPGFcoiRkZE0d+5cpRyvRa9qvHy6zvF58skn6fDhwyp1yn7bAlF+djZF2lxuNS8nVwnArQJ8sqg+zE74/qtf/YpUAZBLxU6YMEHqHpeKff3116Uy3MnrtLsxEK1YsULpu90CnEBp6pyJi4vT0vXyyy8bCUS4NLP7bIE9EACBKgQQiKogwQYQAAG7CSAQ2U0c9kAABKoQQCCqggQbQAAE7CaAQGQ3cdgDARCoQgCBqAoSbAABELCbAAKR3cRhDwRAoAoB2/KIqliugRu4uFhMTIyRkXFymqpxkTWdCnnsU0hIiFQd56Do+K7SIzXicCcXwdMZo46b+fn5pFqGnJM2o6KilOp0jiGfD3yMZI0TTXNz1blzzIF9kzXdc4vHp2KqU3wQgUh2NCz23XfffcQvu9qePXuobdu2SnP79u2jlJQUqVzPnj21TmKpEpd3fvbZZ8Y8bN68OR06dEiqj0vFrl27VirDnZyhraqGyBnTqmRFDkKciKhqq1evpoEDB0rFjh49Sk2bNpXKcGdaWhpdf/31SjmVgDwsqvZGPwiAAAgYIIBAZAAiVIAACPhHAIHIP37YGwRAwAABBCIDEKECBEDAPwIIRP7xw94gAAIGCCAQGYAIFSAAAv4RQCDyjx/2BgEQMEAAgcgARKgAARDwjwASGv3jF7C9Fy9eTG+88YZUf7aoemmq7dy5U1lVkW0tXbpUWSK1V69exElzssZLGquS6nh/TqxTtbNnz2rpUunh/hYtWtDMmeqSxlxdUpXFzOVWa3obO3YsJSYmSofJybRcyVHWEIhkdBzs++6772jNGvvqbfOHWccer1mvag0bNlQGBtZz8803q1Rp9RcUFGj5rqOsXbt2OmLEmehoRF999ZUSA59bqoZLMxUh9IMACAScAAJRwBHDAAiAgIoAApGKEPpBAAQCTgCBKOCIYQAEQEBFAIFIRQj9IAACASeAQBRwxDAAAiCgIoBApCKEfhAAgYATsC2PSFXmMhAjVZXDDIRNUzqTkpKoSZMmUnWci3PixAmpjG4nl/NU2WNdOseRE/1Onz4tNV1cXCztL+9MSEhQLnFdLqv6e/LkSSosLJSKMdMjR45IZbizUaNGxMtmyxqXk01PT5eJePpUJWeVCmqAgJykwQFeNvzXVNypo0GNalV1ExPUQi6VGDduHPFL1nbv3q1VKlamo7yva9euWh/AcnnZ3/fff5+GDRsmE9Huu+eee2jGjBna8jLBzp070+bNm2Ui9M0332iVSD1w4ABxuVhZ+/zzz2nAgAEyEfT9h4BtgSj8iibELzQQAAEQqEwA94gqE8F7EAAB2wkgENmOHAZBAAQqE0AgqkwE70EABGwngEBkO3IYBAEQqEwAgagyEbwHARCwnQACke3IYRAEQKAyAQSiykTwHgRAwHYCRvKIuGymzhrfto9Ow+D58+c1pNwp0rJlS8/a4yrvfv/73xNnFctax44dafbs2TIRT1+fPn0oMzNTKse6eE10E61+/fpKNZzFrVN2dtKkSdSsWTOpvv3799Odd94pleHOwYMHU2RkpFSuTZs2xjjMnz9fWW41KipKy96VV14p9dtKZ2pqKrVu3Vq6S1xcnLTf0ynSy6WtQ4cOZULwkn9JIbm8s1WrVsrj17t3b61RiKknSl1Dhw7V0mVK6NixY0qf+BzeuHGj0uT27du1dOl8Jvr376+0pytw9913K/2KiYnRVaeUO3z4sNIeMxBfOEpdOgK4NBM00UAABJwlgEDkLH9YBwEQEAQQiHAagAAIOE4AgcjxQwAHQAAEEIhwDoAACDhOAIHI8UMAB0AABBCIcA6AAAg4TkCZ0MhJWWjBTaBt27bK9clVSWnlBNq3b69MaOT14+1snFgo8t2UJuPj45UysbGxWrqUioQAr/luqnE1SNUYudyvqcbJkSp7bEsrWVHDqRBONtKQgwgIgAAIBIwALs0ChhaKQQAEdAkgEOmSghwIgEDACCAQBQwtFIMACOgSQCDSJQU5EACBgBFAIAoYWigGARDQJYBApEsKciAAAgEjgEAUMLRQDAIgoEvg/wGjtMESga2AVAAAAABJRU5ErkJggg==';

  var dd = {
  	content: [
  	    {
  		    alignment: 'center',
  		    table: {
          		widths: ['*','auto','auto'],
          		body: [
          			[{rowSpan: 5, image: logo, fit: [260, 260]},'SERIE:','A'],
          			['','FOLIO:','42'],
          			['','FECHA:','04/07/2017'],
          			['','EXPEDICION:','44600'],
          			['','COMPROBANTE:','I-Ingresos']
          		]
          	},
  					layout: 'noBorders',
  					layout: 'lightHorizontalLines'
  		},
  		'\n',
          {
              table: {
                  widths: ['auto','*','auto','auto'],
                  body: [
                      [{text: 'EMISOR', style: 'tableHeader', colSpan: 4, alignment: 'center'}, {}, {},{}],
                      ['NOMBRE:', 'Pinturas Magicas SA de CV','RFC:', 'PIM801201MK2'],
                      ['REGIMEN FISCAL:', {colSpan: 3, text: '601 - General de Ley de Personas Morales'},'']
                  ]
              },
  						layout: 'noBorders',
  						layout: 'lightHorizontalLines'
          },
  		'\n',
          {
              table: {
                  widths: ['auto','*','auto','auto'],
                  body: [
                      [{text: 'RECEPTOR', style: 'tableHeader', colSpan: 4, alignment: 'center'}, {}, {},{}],
                      ['NOMBRE:', 'Computacion en Accion SA de CV','RFC:', 'CAC840428RH1'],
                      ['RESIDENCIA FISCAL:', '','USO CFDI:', 'G03 - Gastos en General'],
                      ['NUMERO ID TRIB.:', {colSpan: 3, text: ''},'']
                  ]
              },
  						layout: 'noBorders',
  						layout: 'lightHorizontalLines'
          },
  		'\n',
          {
              table: {
                  widths: [95,'*',95,'*'],
                  body: [
                      [{text: 'DATOS GENERALES DEL COMPROBANTE', style: 'tableHeader', colSpan: 4, alignment: 'center'}, {}, {},{}],
                      ['MONEDA:', 'MXN - Peso Mexicano','FORMA PAGO:', '04 - Tarjeta de credito'],
                      ['TIPO DE CAMBIO:', '1.00','CONDICIONES DE PAGO:', 'Contado'],
                      ['CLAVE CONFIRMACION:', 'A403b','METODO DE PAGO:', 'PUE - Pago en una sola exhibicion']
                  ]
              },
  						layout: 'noBorders',
  						layout: 'lightHorizontalLines'
          },
  		'\n',
          {
              table: {
                  widths: [40,40,40,40,40,40,40,40,25,30,40],
                  body: [
                      [{text: 'PARTIDAS DEL COMPROBANTE', style: 'tableHeader', colSpan: 11, alignment: 'center'},{},{},{},{},{},{},{},{},{},{}],
                      ['ClaveProdServ','Numero Identificacion','Cantidad','Clave Unidad','Unidad','Descripcion','Valor Unitario','Descuento',{colSpan: 2, text: 'Impuesto'},'','Importe'],
                      ['31211502','UT421510','24','LTR','Litros','Pintura vinilica blanca','$ 49.50','$ 0','002 - IVA','$ 190.08','$ 1,188.00'],
  										['31211502','UT421510','24','LTR','Litros','Pintura vinilica blanca','$ 49.50','$ 0','002 - IVA','$ 190.08','$ 1,188.00'],
  										['31211502','UT421510','24','LTR','Litros','Pintura vinilica blanca','$ 49.50','$ 0','002 - IVA','$ 190.08','$ 1,188.00'],
  										['31211502','UT421510','24','LTR','Litros','Pintura vinilica blanca','$ 49.50','$ 0','002 - IVA','$ 190.08','$ 1,188.00'],
  										['31211502','UT421510','24','LTR','Litros','Pintura vinilica blanca','$ 49.50','$ 0','002 - IVA','$ 190.08','$ 1,188.00']
                  ]
              },
  						layout: {
  							fillColor: function (i, node) {
  								return (i % 2 != 0) ? '#CCCCCC' : null;
  							}
  						}
          },
  		'\n',
          {
              table: {
                  widths: ['auto','*','auto','*'],
                  body: [
                      [{text: 'CFDI RELACIONADO', style: 'tableHeader', colSpan: 4, alignment: 'center'}, {}, {},{}],
                      ['TIPO RELACION:', '04 - Sustitucion de los CFDI previos','CFDI RELACIONADO:', 'A39DA66B-49E3-879B-FC05185B0EF7'],
                      ['SUBTOTAL:', '$ 1,258.00','TOTAL:','$ 1,459.28'],
                      ['DESCUENTO:', '$ 0',{colSpan: 2, text: 'IMPORTE CON LETRA:'},''],
                      ['TOTAL IMP. TRASLADADOS:', '$ 201.28',{colSpan: 2, rowSpan: 2, text: 'Mil cuatrocientos cincuenta y nueve  con 28 centavos'},''],
                      ['TOTAL IMP. RETENIDOS:', '$ 0','',''],
                  ]
              },
  						layout: 'noBorders',
  						layout: 'lightHorizontalLines'
          },
  		'\n',
          {
              table: {
                  widths: [100,100,287],
                  body: [

                      [{colSpan: 1, rowSpan: 4, image: qr, fit: [100, 100]},'NUMERO SERIE CERTIFICADO','00001000000404420163'],
                      ['', 'FECHA HORA CERTIFICACION', '2017-07-01 11:20:08'],
                      ['', 'FOLIO FISCAL UUID', 'AED630FF-5168-4FFF-A3A5-077F707BA39E'],
                      ['', 'SELLO DIGITAL', 'Wnl8bQigrN5ldr2jXf9UUxlGNYf56u/6oTUHz+bWkyOYOrojzrNGJF+imHpUxVg=='],
                      ['SELLO DEL SAT',{colSpan: 2, text: 'eXO/3n0UaqleEN7EX/4Pv42gjwD4DH6JX/iIP23OeX7ocAUTcwkJgbHcYLQSiNU4UK6GnrCQ36PKkVJ3Dv2jxhx01gRv2ty4+hl1VjTD8w9p/BcGngRlGhDGjMKrbI4iqVpf30ysq5qLv8oyUMC107fniyvogFDUpqyO6yE6ArfM5FuJlUcnuF8fmFifvVq+vUmTGPuy9owoxDSUTZ+TC0Fs1UVQ4cNoyd9y5jqQJ2XGhuIYR8oSGCAAZzm1mnF+5yaX122l7kaf0HUvNlSEp0SLck9H8MGeogeUdZrDHdbKKCtQJ5ws8vGzkma01VL2PHzozmmbD7ve90G3rhMjaw=='}],
                      ['CADENA ORIGINAL',{colSpan: 2, text: 'MIIGUjCCBDqgAwIBAgIUMDAwMDEwMDAwMDA0MDQxMjQyNTQwDQYJKoZIhvcNAQELBQAwggGyMAQ8AMIIBCgKCAQEAiyv5eDPY+iE/PR6ASq/PMFf6rHOGnSPx99j+MfBfXi4TEYBW4nhxG1sjlod3xf9VRPFzZGXVkT3K+1JEnYWnvBwWOk'}]
                  ]
              },
  						layout: 'noBorders',
  						layout: 'lightHorizontalLines'
          }
  	],
  	styles: {
  		header: {
  			fontSize: 18,
  			bold: true,
  			margin: [0, 0, 0, 10]
  		},
  		subheader: {
  			fontSize: 16,
  			bold: true,
  			margin: [0, 10, 0, 5]
  		},
  		tableExample: {
  			margin: [0, 5, 0, 15]
  		},
  		tableHeader: {
  			bold: true,
  			fontSize: 13,
  			color: 'black'
  		}
  	},
  	defaultStyle: {
  		// alignment: 'justify'
  	}
  }

  return dd;
}

module.exports = createPDFContent
