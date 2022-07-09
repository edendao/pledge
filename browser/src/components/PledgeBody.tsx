import "./PledgeBody.css"

import { Footnote } from "./Footnote"
import SectionDivider from "./SectionDivider"

export function PledgeBody() {
  return (
    <>
      <p>
        <Footnote
          left
          data={
            <>
              also <strong>Garden of Eden</strong>, the place where Adam and Eve
              lived in the Abrahamic account of the Creation, from which they
              were expelled for disobediently eating the fruit of the tree of
              knowledge.
            </>
          }
        >
          <span className="shimmer">Eden</span>
        </Footnote>
        &nbsp;
        <Footnote
          data={
            <>
              also <strong>Tao</strong>, in Chinese philosophy, the absolute
              principle underlying the universe, combining within itself the
              principles of Yin and Yang and signifying the Way, or Code of
              Behaviour, that is in <em>harmony with the natural order</em>. The
              interpretation of Tao in the Dao-de-Ching developed into the
              philosophical religion of Daoism.
            </>
          }
        >
          <span className="shimmer">Dao</span>
        </Footnote>
        &nbsp; draws on the Abrahamic Garden of Eden and the Dao of Daoism to
        mean &ldquo;the Way or Path towards Eden&rdquo;. As a{" "}
        <Footnote
          topOffset={100}
          data={
            <>
              <a
                href="https://otherinter.net/research/headless-brands/"
                target="_blank"
              >
                as proposed by other internet
              </a>
              , headless brands are community-driven, decentralized brands, not
              managed by a centralized team.
            </>
          }
        >
          headless brand
        </Footnote>
        , it points towards the broader regenerative finance movement, and not
        to any particular DAO.
      </p>
      <p>
        This pledge helps us create a space of passionate, values-aligned
        members. It is an opportunity for{" "}
        <span className="shimmer">resonant tuning</span> &mdash; to align our
        intentions and motivations with each other.
      </p>
      <SectionDivider />
      <article className="text-center">
        <h3 className="text-4xl mb-4">the eden dao pledge</h3>
        <p>
          I refuse to empower the forces of extraction with despair and
          innaction. I reject their doctrine and accept the path towards
          reconnection, regeneration, harmony and flourishing.
        </p>
        <p>
          I recognize myself as an expression of Mother Earth instead of
          separate from it, along with all its living beings, systems and
          rhythms. Just like a flower does not sprout out of the meadow, but is
          the meadow manifesting its nature as a flower.
        </p>
        <p>
          I choose to walk towards a future of hope, renewal, healing and
          co-creation. A future, where the expression of humanity is not one of
          destruction but a steward for the blossoming of life.
        </p>
        <p>
          I declare my right to pursue a life unbound to an economy of
          extraction. A product of the maladaptive narratives of the past which
          have brought great destruction and suffering to life on this planet.
        </p>
        <p>
          I believe that the creation of a regenerative economy is not only
          possible but necessary for human prosperity to thrive in harmony with
          the rhythms of our world.
        </p>
        <p>
          <strong>
            It is from this holistic awareness of my being, that I vow to renew
            my relationship with life.
          </strong>
        </p>
        <p className="py-8 text-3xl">
          <strong>
            I believe in a way forward towards{" "}
            <strong className="shimmer">
              reconnection, regeneration, harmony, and flourishing
            </strong>
            , and that this is true wealth.
          </strong>
        </p>
      </article>
    </>
  )
}
